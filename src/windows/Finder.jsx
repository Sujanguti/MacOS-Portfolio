import { useState } from "react";
import useWindowStore from "#store/window";
import WindowControls from "./WindowControls";
import { locations } from "#constants/index.js";

const Finder = () => {
    const windows = useWindowStore((state) => state.windows);
    const [activeFolder, setActiveFolder] = useState("work");

    const folders = Object.values(locations);
    const activeData = locations[activeFolder];

    return (
        <div id="finder" style={{ zIndex: windows.finder.zIndex }}>
            <div id="window-header">
                <WindowControls windowKey="finder" />
                <h2>Portfolio</h2>
            </div>

            <div className="flex">
                <div className="sidebar">
                    <h3>Portfolio</h3>
                    <ul>
                        {folders.map((folder) => (
                            <li
                                key={folder.id}
                                className={activeFolder === folder.type ? "active" : "not-active"}
                                onClick={() => setActiveFolder(folder.type)}
                            >
                                <img src={folder.icon} alt={folder.name} className="w-4" />
                                <p>{folder.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="content">
                    <ul>
                        {activeData?.children?.map((item) => (
                            <li key={item.id} className={`group ${item.position || ""}`}>
                                <img src={item.icon} alt={item.name} />
                                <p>{item.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Finder;
