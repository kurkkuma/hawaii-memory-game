import "./rating.css";
import { useContext } from "react";
import { AppContext } from "../../../App";

function Rating() {
  const { showRating } = useContext(AppContext);
  return (
    <div className={`rating-container ${showRating ? "active" : ""}`}>
      <h1>Best Players</h1>
      <ul>
        <li>Lorem, ipsum.</li>
        <li>Lorem, ipsum.</li>
        <li>Lorem, ipsum.</li>
        <li>Lorem, ipsum.</li>
        <li>Lorem, ipsum.</li>
        <li>Lorem, ipsum.</li>
        <li>Lorem, ipsum.</li>
        <li>Lorem, ipsum.</li>
      </ul>
    </div>
  );
}

export default Rating;
