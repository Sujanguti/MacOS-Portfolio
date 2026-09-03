import useWindowStore from "#store/window";
import WindowControls from "./WindowControls";

const Resume = () => {
    const windows = useWindowStore((state) => state.windows);

    return (
        <div id="resume" style={{ zIndex: windows.resume.zIndex }}>
            <div id="window-header">
                <WindowControls windowKey="resume" />
                <h2>Resume</h2>
            </div>

            <div className="p-4">
                <p className="text-sm text-gray-500">
                    Resume document coming soon.
                </p>
            </div>
        </div>
    );
};

export default Resume;
