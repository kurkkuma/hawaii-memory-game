import "./userInfo.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";

function UserInfo() {
  const { user, setUser, updateUserDataDB } = useContext(AppContext);
  const [isChanging, setIsChanging] = useState(false);
  const [newNickname, setNewNickname] = useState<string>(user.nickname);
  const [error, setError] = useState<string>("");

  const handleChangeNickname = async () => {
    if (
      newNickname.trim().length > 0 &&
      newNickname.trim() !== user.nickname.trim()
    ) {
      const updatedUser = { ...user, nickname: newNickname };

      const res = await updateUserDataDB(updatedUser);

      if (res) {
        setUser(updatedUser);
        setIsChanging(false);
      } else {
        setError("That nickname is already taken.");
      }
    } else if (newNickname.trim() === user.nickname) {
      setIsChanging(false);
    }
  };

  useEffect(() => {
    setNewNickname(user.nickname);
  }, [user]);

  return (
    <div className="user-rating-container">
      <div className="user-container">
        <img
          className="user-icon"
          src="images/icons/user.png"
          alt="user icon"
        />
        {isChanging ? (
          <div className="input-container">
            <input
              className="change-nickname"
              type="text"
              value={newNickname}
              onChange={(e) => {
                setNewNickname(e.target.value);
                setError("");
              }}
              maxLength={20}
            />

            {error && <p className="error">{error}</p>}
          </div>
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
