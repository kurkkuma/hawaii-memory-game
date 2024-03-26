import "./index.css";
import { useEffect, useState, createContext } from "react";
import Navbar from "./components/navbar/Navbar";
import Game from "./components/game/Game";
import Loader from "./components/loader/Loader";
import Confetti from "react-confetti";

import cardImages from "../data.ts";

export type UserType = {
  nickname: string;
  levelsCompleted: string;
};
interface UserContextType {
  user: UserType;
  won: boolean;
  setUser: any;
  setWon: any;
  updateUserDataDB: any;
}

// Создание контекста
export const AppContext = createContext<UserContextType>({
  user: { nickname: "", levelsCompleted: "0" },
  won: false,
  setUser: () => {},
  setWon: () => {},
  updateUserDataDB: () => {},
});

function App() {
  const [user, setUser] = useState<UserType>({
    nickname: getNickname(),
    levelsCompleted: getLevelsCompleted(),
  });
  const [won, setWon] = useState(false);
  const [imgsLoaded, setImgsLoaded] = useState(false);

  function getNickname() {
    let nickname = localStorage.getItem("nickname");

    if (!nickname) {
      nickname = "user" + Math.floor(Math.random() * 999999).toString();
      localStorage.setItem("nickname", nickname);
      return nickname;
    }

    return nickname;
  }

  function getLevelsCompleted() {
    let levels = localStorage.getItem("levelsCompleted");

    if (!levels) {
      levels = "0";
      localStorage.setItem("levelsCompleted", levels);
      return levels;
    }

    return levels;
  }

  const updateUserDataDB = (updatedUser: UserType) => {
    fetch("http://localhost:8080/add-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Server data: ", data);
      })
      .catch((error) => {
        console.error("There was an error with the fetch operation:", error);
      });
  };

  useEffect(() => {
    if (won) {
      updateUserDataDB(user);
    }
  }, [won]);

  useEffect(() => {
    const loadImage = (image: any) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image.src;
        loadImg.onload = () =>
          setTimeout(() => {
            resolve(image.src);
          }, 1500);

        loadImg.onerror = (err) => {
          console.log("Error loading image:", err);
          reject(err);
        };
      });
    };

    Promise.all(cardImages.map((image: any) => loadImage(image)))
      .then(() => setImgsLoaded(true))
      .catch((err) => console.log("Failed to load images", err));
  }, []);

  return (
    <AppContext.Provider
      value={{ user, won, setUser, setWon, updateUserDataDB }}
    >
      <div className="main-container">
        <Navbar />
        {imgsLoaded ? <Game /> : <Loader />}
        {won && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;