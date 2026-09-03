import useWindowStore from "#store/window";
import WindowControls from "./WindowControls";
import { socials } from "#constants/index.js";

const Contact = () => {
    const windows = useWindowStore((state) => state.windows);

    return (
        <div id="contact" style={{ zIndex: windows.contact.zIndex }}>
            <div id="window-header">
                <WindowControls windowKey="contact" />
                <h2>Contact</h2>
            </div>

            <div className="p-6">
                <h3>Get in Touch</h3>
                <p className="text-gray-500 text-sm mt-2 mb-6">
                    Feel free to reach out through any of these platforms.
                </p>

                <ul>
                    {socials.map((social) => (
                        <li key={social.id} style={{ backgroundColor: social.bg }}>
                            <a href={social.link} target="_blank" rel="noreferrer">
                                <img src={social.icon} alt={social.text} className="w-8 h-8" />
                                <p>{social.text}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Contact;
