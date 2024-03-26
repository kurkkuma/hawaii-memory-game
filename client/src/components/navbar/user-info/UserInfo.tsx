import "./userInfo.css";
import { useContext, useState } from "react";
import { AppContext } from "../../../App";

import { UserType } from "../../../App";

function UserInfo() {
  const { user, setUser, updateUserDataDB } = useContext(AppContext);
  const [isChanging, setIsChanging] = useState(false);
  const [newNickname, setNewNickname] = useState<string>(user.nickname);

  const handleChangeNickname = () => {
    if (
      newNickname.trim().length > 0 &&
      newNickname.trim() !== user.nickname.trim()
    ) {
      localStorage.setItem("nickname", newNickname);
      setUser((prev: UserType) => {
        const updatedUser = { ...prev, nickname: newNickname };
        updateUserDataDB(updatedUser);
        return updatedUser;
      });
    }

    setIsChanging(false);
  };

  return (
    <div className="user-rating-container">
      <div className="user-container">
        <img
          className="user-icon"
          src="images/icons/user.png"
          alt="user icon"
        />
        {isChanging ? (
          <input
            className="change-nickname"
            type="text"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
          />
        ) : (
          <p className="user-name">{user.nickname}</p>
        )}
        {isChanging ? (
          <img
            onClick={handleChangeNickname}
            className="check-mark"
            src="images/icons/check-mark.png"
            alt="save the changed nickname icon"
          />
        ) : (
          <img
            onClick={() => {
              setIsChanging(true);
            }}
            className="pencil-icon"
            src="images/icons/pencil.png"
            alt="edit user name"
          />
        )}
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
