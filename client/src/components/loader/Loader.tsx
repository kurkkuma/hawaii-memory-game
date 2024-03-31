import "./loader.css";

function Loader() {
  return (
    <div className="loader-container">
      <img src="images/loader.gif" alt="loader gif" />
      <p className="loading-title">Loading...</p>
      <p className="loading-info">
        I apologize! The game's API server is located on a free platform and is
        suspended during inactivity, which may result in delayed requests for
        15-30 seconds or more 😥
      </p>
    </div>
  );
}

export default Loader;
