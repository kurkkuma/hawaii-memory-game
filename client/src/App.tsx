import "./index.css";
import { useEffect, useState, createContext, useRef } from "react";
import axios from "axios";
import Navbar from "./components/navbar/Navbar";
import Game from "./components/game/Game";
import Loader from "./components/loader/Loader";
import Confetti from "react-confetti";

import cardImages from "../data.ts";
import Rating from "./components/navbar/rating/Rating.tsx";

export type UserType = {
  id: number;
  nickname: string;
  levelsCompleted: number;
};
interface UserContextType {
  api: any;
  user: UserType;
  won: boolean;
  showRating: boolean;
  setShowRating: any;
  setUser: any;
  setWon: any;
  updateUserDataDB: any;
}

export const AppContext = createContext<UserContextType>({
  api: {},
  user: { id: 0, nickname: "", levelsCompleted: 0 },
  won: false,
  showRating: false,
  setShowRating: () => {},
  setUser: () => {},
  setWon: () => {},
  updateUserDataDB: () => {},
});

function App() {
  const [user, setUser] = useState<UserType>({
    id: 0,
    nickname: "",
    levelsCompleted: 0,
  });
  const [won, setWon] = useState(false);
  const [imgsLoaded, setImgsLoaded] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const effectRan = useRef(false);
  const api = axios.create({
    // baseURL: "https://hawaii-memory-game.onrender.com",
    // baseURL: "http://localhost:8080",
    baseURL: "https://hawaii-memory-game-server-2.onrender.com",
  });

  function createNickname() {
    const nickname = "user" + Math.floor(Math.random() * 999999).toString();
    return nickname;
  }

  const updateUserDataDB = async (updatedUser: UserType) => {
    try {
      const res = await axios.post(`${api.defaults.baseURL}/update-user`, {
        id: updatedUser.id,
        nickname: updatedUser.nickname,
        levelsCompleted: updatedUser.levelsCompleted,
      });

      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data));
        return true;
      }
      if (res.status === 201) {
        return false;
      }
    } catch (err) {
      console.error("Error: ", err);
      throw err;
    }
  };

  const createUserDataDB = async (nickname: string) => {
    try {
      const res = await axios.post(`${api.defaults.baseURL}/create-user`, {
        nickname,
      });
      return res.data;
    } catch (err) {
      console.error("Error: ", err);
      throw err;
    }
  };

  async function getUser() {
    const existedUser = localStorage.getItem("user");

    if (!existedUser) {
      const dataFromDB = await createUserDataDB(createNickname());
      localStorage.setItem("user", JSON.stringify(dataFromDB));
      setUser(dataFromDB);
      return;
    }

    const parsedUser = JSON.parse(existedUser);
    setUser(parsedUser);
    return;
  }

  useEffect(() => {
    if (effectRan.current === false) {
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

      if (user.id === 0 && !user.nickname && !user.levelsCompleted) {
        getUser();
      }
      return () => {
        effectRan.current = true;
      };
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        api,
        user,
        won,
        showRating,
        setUser,
        setWon,
        setShowRating,
        updateUserDataDB,
      }}
    >
      <div className="main-container">
        <Rating />

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
