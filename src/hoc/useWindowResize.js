import { useState, useCallback, useRef, useEffect } from "react";

const MIN_W = 400;
const MIN_H = 300;

const cursors = {
  n: "ns-resize",
  s: "ns-resize",
  e: "ew-resize",
  w: "ew-resize",
  ne: "nesw-resize",
  sw: "nesw-resize",
  nw: "nwse-resize",
  se: "nwse-resize",
};

const useWindowResize = (windowKey, resizeWindow) => {
  const [dims, setDims] = useState({ width: null, height: null });
  const active = useRef(false);
  const dirRef = useRef(null);
  const startRef = useRef({ x: 0, y: 0, w: 0, h: 0 });
  const finalRef = useRef({ w: null, h: null });

  const onMouseDown = useCallback((e, dir) => {
    e.preventDefault();

    const section = e.currentTarget.parentElement;
    active.current = true;
    dirRef.current = dir;
    startRef.current = {
      x: e.clientX,
      y: e.clientY,
      w: section.offsetWidth,
      h: section.offsetHeight,
    };

    document.body.style.cursor = cursors[dir];
    document.body.style.userSelect = "none";
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (!active.current) return;

      const { x: sx, y: sy, w: sw, h: sh } = startRef.current;
      const dir = dirRef.current;
      const dx = e.clientX - sx;
      const dy = e.clientY - sy;

      let w = sw;
      let h = sh;

      if (dir === "e") w = sw + dx;
      else if (dir === "w") w = sw - dx;
      else if (dir === "s") h = sh + dy;
      else if (dir === "n") h = sh - dy;
      else if (dir === "se") { w = sw + dx; h = sh + dy; }
      else if (dir === "sw") { w = sw - dx; h = sh + dy; }
      else if (dir === "ne") { w = sw + dx; h = sh - dy; }
      else if (dir === "nw") { w = sw - dx; h = sh - dy; }

      const clamped = {
        width: Math.max(w, MIN_W),
        height: Math.max(h, MIN_H),
      };

      finalRef.current = clamped;
      setDims(clamped);
    };

    const onUp = () => {
      if (!active.current) return;
      active.current = false;
      dirRef.current = null;
      window.__resizing = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";

      if (windowKey && resizeWindow && finalRef.current.w != null) {
        resizeWindow(windowKey, finalRef.current.w, finalRef.current.h);
        finalRef.current = { w: null, h: null };
        setDims({ width: null, height: null });
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [windowKey, resizeWindow]);

  return { dims, onMouseDown };
};

export default useWindowResize;
