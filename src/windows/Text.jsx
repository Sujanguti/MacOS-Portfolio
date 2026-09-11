import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import { WindowControls } from "#components";

const Text = () => {
  const data = useWindowStore((state) => state.windows.txtfile.data);

  if (!data) return null;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{data.name}</h2>
      </div>

      <div className="p-4 overflow-y-auto h-full">
        {data.image && (
          <img src={data.image} alt={data.name} className="mb-4 max-h-48 object-cover" />
        )}

        {data.subtitle && (
          <h3 className="text-lg font-semibold mb-3">{data.subtitle}</h3>
        )}

        {data.description?.map((paragraph, i) => (
          <p key={i} className="mb-3 leading-relaxed text-sm">
            {paragraph}
          </p>
        ))}
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");
export default TextWindow;
