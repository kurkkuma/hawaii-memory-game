import Navbar from "./components/navbar/Navbar";
import Game from "./components/game/Game";
import Loader from "./components/loader/Loader";
import Confetti from "react-confetti";
import "./index.css";
import { useEffect, useState } from "react";

import cardImages from "../data.ts";

function App() {
  const [won, setWon] = useState(false);
  const [imgsLoaded, setImgsLoaded] = useState(false);

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
    <div className="main-container">
      <Navbar />
      {imgsLoaded ? <Game setWon={setWon} /> : <Loader />}
      {won && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
    </div>
  );
}

export default App;
