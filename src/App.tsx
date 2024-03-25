import "./index.css";
import { useEffect, useState, createContext } from "react";
import Navbar from "./components/navbar/Navbar";
import Game from "./components/game/Game";
import Loader from "./components/loader/Loader";
import Confetti from "react-confetti";

import cardImages from "../data.ts";
interface UserContextType {
  user: string;
  setUser: any;
}

// Создание контекста
export const AppContext = createContext<UserContextType>({
  user: "",
  setUser: () => {},
});

function App() {
  const [user, setUser] = useState(generateUniqueNickname());
  const [won, setWon] = useState(false);
  const [imgsLoaded, setImgsLoaded] = useState(false);

  function generateUniqueNickname() {
    let nickname = localStorage.getItem("nickname");

    if (!nickname) {
      nickname = "user" + Math.floor(Math.random() * 999999).toString();
      localStorage.setItem("nickname", nickname);
      return nickname;
    }

    return nickname;
  }

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
    <AppContext.Provider value={{ user, setUser }}>
      <div className="main-container">
        <Navbar />
        {imgsLoaded ? <Game setWon={setWon} /> : <Loader />}
        {won && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
