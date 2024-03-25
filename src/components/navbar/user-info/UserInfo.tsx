import "./userInfo.css";
import { useContext } from "react";
import { AppContext } from "../../../App";

function UserInfo() {
  const { user } = useContext(AppContext);

  const handleChangeNickname = () => {
    console.log("change change");
  };

  return (
    <div className="user-rating-container">
      <div className="user-container">
        <img
          className="user-icon"
          src="images/icons/user.png"
          alt="user icon"
        />
        <p className="user-name">{user}</p>
        <img
          onClick={handleChangeNickname}
          className="pencil-icon"
          src="images/icons/pencil.png"
          alt="edit user name"
        />
      </div>
      <img
        className="cup-icon"
        src="images/icons/cup.png"
        alt="open and close rating icon"
      />
    </div>
  );
}

export default UserInfo;
