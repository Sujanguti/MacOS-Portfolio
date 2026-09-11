import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import useWindowResize from "#hoc/useWindowResize";

const HANDLE = "window-resize-handle";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, resizeWindow, windows } = useWindowStore();
    const { isOpen, zIndex, width: storeW, height: storeH } = windows[windowKey];
    const ref = useRef(null);
    const { dims, onMouseDown } = useWindowResize(windowKey, resizeWindow);

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      el.style.display = "block";

      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        }
      );
    }, [isOpen]);

    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      const [instance] = Draggable.create(el, {
        onPress: () => focusWindow(windowKey),
      });

      return () => instance.kill();
    }, []);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;

      const handler = (e) => {
        if (e.target.closest?.(`.${HANDLE}`)) {
          window.__resizing = true;
          e.stopPropagation();
        }
      };

      el.addEventListener("mousedown", handler, { capture: true });
      return () => el.removeEventListener("mousedown", handler, { capture: true });
    }, []);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    const style = { zIndex };
    if (dims.width) style.width = dims.width;
    else if (storeW) style.width = storeW;
    if (dims.height) style.height = dims.height;
    else if (storeH) style.height = storeH;

    return (
      <section
        id={windowKey}
        ref={ref}
        style={style}
        className="absolute flex flex-col"
      >
        <Component {...props} />

        {["n", "s", "e", "w", "ne", "nw", "se", "sw"].map((dir) => (
          <div
            key={dir}
            className={`${HANDLE} window-resize-${dir}`}
            onMouseDown={(e) => onMouseDown(e, dir)}
          />
        ))}
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default WindowWrapper;
