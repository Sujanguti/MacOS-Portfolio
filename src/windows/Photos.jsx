import useWindowStore from "#store/window";
import WindowControls from "./WindowControls";
import { photosLinks, gallery } from "#constants/index.js";

const Photos = () => {
    const windows = useWindowStore((state) => state.windows);

    return (
        <div id="photos" style={{ zIndex: windows.photos.zIndex }}>
            <div id="window-header">
                <WindowControls windowKey="photos" />
                <h2>Gallery</h2>
            </div>

            <div className="flex">
                <div className="sidebar">
                    <h2>Gallery</h2>
                    <ul>
                        {photosLinks.map((link, index) => (
                            <li key={link.id} className={index === 0 ? "bg-blue-100 text-blue-700" : ""}>
                                <img src={link.icon} alt={link.title} />
                                <p>{link.title}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="gallery">
                    <ul>
                        {gallery.map((photo) => (
                            <li key={photo.id}>
                                <img src={photo.img} alt={`Gallery ${photo.id}`} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Photos;
