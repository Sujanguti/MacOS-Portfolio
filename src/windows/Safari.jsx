import useWindowStore from "#store/window";
import WindowControls from "./WindowControls";
import { blogPosts } from "#constants/index.js";

const Safari = () => {
    const windows = useWindowStore((state) => state.windows);

    return (
        <div id="safari" style={{ zIndex: windows.safari.zIndex }}>
            <div id="window-header">
                <WindowControls windowKey="safari" />
                <div className="search">
                    <input type="text" placeholder="Search articles..." />
                </div>
            </div>

            <div className="blog">
                <h2>Articles</h2>

                {blogPosts.map((post) => (
                    <div key={post.id} className="blog-post">
                        <img src={post.image} alt={post.title} />
                        <div className="content">
                            <p>{post.date}</p>
                            <h3>{post.title}</h3>
                            <a href={post.link} target="_blank" rel="noreferrer">
                                Read article
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Safari;
