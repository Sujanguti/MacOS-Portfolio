import useWindowStore from "#store/window";

const WindowControls = ({ windowKey }) => {
    const { closeWindow } = useWindowStore();

    return (
        <div id="window-controls">
            <div className="close" onClick={() => closeWindow(windowKey)} />
            <div className="minimize" />
            <div className="maximize" />
        </div>
    );
};

export default WindowControls;
