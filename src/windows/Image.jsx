import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import { WindowControls } from "#components";

const Image = () => {
  const data = useWindowStore((state) => state.windows.imgfile.data);

  if (!data) return null;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2>{data.name}</h2>
      </div>

      <div className="p-4 flex items-center justify-center h-full">
        {data.imageUrl && (
          <img src={data.imageUrl} alt={data.name} className="max-w-[300px] max-h-[500px] object-contain" />
        )}
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(Image, "imgfile");
export default ImageWindow;
