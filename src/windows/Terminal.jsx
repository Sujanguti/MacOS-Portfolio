import useWindowStore from "#store/window";
import WindowControls from "./WindowControls";
import { techStack } from "#constants/index.js";

const Terminal = () => {
    const windows = useWindowStore((state) => state.windows);

    return (
        <div id="terminal" style={{ zIndex: windows.terminal.zIndex }}>
            <div id="window-header">
                <WindowControls windowKey="terminal" />
                <h2>Skills</h2>
            </div>

            <div className="techstack">
                {techStack.map((stack, index) => (
                    <div key={index}>
                        <div className="label">
                            <h3>{stack.category}</h3>
                        </div>
                        <div className="content">
                            <ul>
                                {stack.items.map((item, i) => (
                                    <li key={i}>
                                        <span className="check">&#10003;</span>
                                        <h3>{item}</h3>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}

                <div className="footnote">
                    <p>&#9650; Always learning, always growing</p>
                </div>
            </div>
        </div>
    );
};

export default Terminal;
