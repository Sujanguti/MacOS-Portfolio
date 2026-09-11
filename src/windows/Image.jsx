import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import { WindowControls } from "#components";
import { useCallback, useRef, useState } from "react";

// Must match the `p-2` content wrapper below (8px per side).
const PAD = 8;
const MIN_W = 280;
const MIN_H = 200;
// Photos Library images render compact (~50% linear size) for a clean
// viewer look. Finder/Work project images stay full size so interviewers
// can clearly see them. The window is derived from the scaled size in
// both cases, so padding stays the same.
const PHOTOS_SCALE = 0.5;
const PROJECT_SCALE = 1;

const Image = () => {
  const data = useWindowStore((state) => state.windows.imgfile.data);
  const resizeWindow = useWindowStore((state) => state.resizeWindow);
  const headerRef = useRef(null);
  // `url` tags the size so a previous image's dimensions are never applied
  // to the next image while it is loading.
  const [displaySize, setDisplaySize] = useState(null);
  const imageUrl = data?.imageUrl;
  const imageSource = data?.source;
  const isPhotosLibrary = imageSource === "photos";
  const displayScale = isPhotosLibrary ? PHOTOS_SCALE : PROJECT_SCALE;

  const onImageLoad = useCallback(
    (e) => {
      const img = e.target;
      const { naturalWidth: nw, naturalHeight: nh } = img;
      if (!nw || !nh || !imageUrl) return;

      // Single source of truth: fit the natural image into the viewport,
      // then derive the window size from that fitted image size.
      const headerH = headerRef.current?.offsetHeight ?? 45;
      const maxW = Math.min(window.innerWidth * 0.8, 1200);
      const maxH = Math.min(window.innerHeight * 0.8, 800);
      const contentMaxW = maxW - PAD * 2;
      const contentMaxH = maxH - headerH - PAD * 2;

      // Never upscale, never crop: preserve aspect ratio, then apply the
      // per-source scale. Window below is derived from w/h so it always
      // matches the displayed image.
      const scale = Math.min(1, contentMaxW / nw, contentMaxH / nh);
      const w = Math.round(nw * scale * displayScale);
      const h = Math.round(nh * scale * displayScale);

      setDisplaySize({ url: imageUrl, source: imageSource, width: w, height: h });
      resizeWindow(
        "imgfile",
        Math.max(w + PAD * 2, MIN_W),
        Math.max(h + headerH + PAD * 2, MIN_H)
      );
    },
    [resizeWindow, imageUrl, imageSource, displayScale]
  );

  if (!data) return null;

  const appliedSize =
    displaySize?.url === imageUrl && displaySize?.source === imageSource
      ? displaySize
      : null;

  return (
    <>
      <div id="window-header" ref={headerRef}>
        <WindowControls target="imgfile" />
        <h2>{data.name}</h2>
      </div>

      <div className="p-2 flex-1 min-h-0 flex items-center justify-center overflow-hidden">
        {data.imageUrl && (
          <img
            key={`${data.source ?? "default"}:${data.imageUrl}`}
            src={data.imageUrl}
            alt={data.name}
            onLoad={onImageLoad}
            style={
              appliedSize
                ? { width: appliedSize.width, height: appliedSize.height }
                : undefined
            }
            className="block max-w-full max-h-full object-contain rounded-md"
          />
        )}
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(Image, "imgfile");
export default ImageWindow;
