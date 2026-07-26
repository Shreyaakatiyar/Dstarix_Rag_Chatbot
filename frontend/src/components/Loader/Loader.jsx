import "../../styles/shared.css";
import "./Loader.css";

function Loader() {
  return (
    <div className="message-row assistant">
      <div className="avatar assistant-avatar" aria-hidden="true">
        G
      </div>
      <div
        className="bubble assistant-bubble loader-bubble"
        role="status"
        aria-label="Consulting the guide"
      >
        <span className="loader-dot" />
        <span className="loader-dot" />
        <span className="loader-dot" />
      </div>
    </div>
  );
}

export default Loader;