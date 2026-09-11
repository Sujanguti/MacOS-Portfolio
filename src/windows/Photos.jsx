import { Mail, Search } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControls } from "#components";
import { gallery, photosLinks } from "#constants";
import useWindowStore from "#store/window";

const Photos = () => {
    const { openWindow } = useWindowStore();

    return (
        <>
            <div id="window-header">
                <WindowControls target="photos" />

                <div className="w-full flex justify-end items-center gap-3 text-gray-500">
                    <span className="group relative flex items-center">
                        <Mail className="icon" />
                        <span className="pointer-events-none absolute top-full right-0 z-50 mt-2 whitespace-nowrap rounded-md bg-gray-900/90 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-xl backdrop-blur-md transition-opacity duration-150 group-hover:opacity-100">
                            sujanguti.work@gmail.com
                        </span>
                    </span>
                    <Search className="icon" />
                </div>
            </div>

            <div className="flex w-full">
                <div className="sidebar">
                    <h2>Photos</h2>

                    <ul>
                        {photosLinks.map(({ id, icon, title }) => (
                            <li key={id}>
                                <img src={icon} alt={title} />
                                <p>{title}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="gallery">
                    <ul>
                        {gallery.map(({ id, img }) => (
                            <li
                                key={id}
                                onClick={() =>
                                    openWindow("imgfile", {
                                        id,
                                        name: "Gallery image",
                                        icon: "/images/image.png",
                                        kind: "file",
                                        FileType: "img",
                                        imageUrl: img,
                                        source: "photos",
                                    })
                                }
                            >
                                <img
                                    src={img}
                                    alt={`Gallery image ${id}`}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

const PhotosWindow = WindowWrapper(Photos, "photos");

export default PhotosWindow;