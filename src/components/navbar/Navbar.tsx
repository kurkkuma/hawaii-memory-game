import { useEffect, useState, useRef } from "react";
import "./navbar.css";

const music = [
  "music/music-1.mp3",
  "music/music-2.mp3",
  "music/music-3.mp3",
  "music/music-4.mp3",
];

function Navbar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(music[1]);
  const audioElem = useRef<HTMLAudioElement | null>(null);

  const changeVolume = () => {
    if (audioElem.current) {
      audioElem.current.volume = 0.1;
    }
  };
  changeVolume();

  const next = () => {
    const index = music.findIndex((item) => item === currentSong);
    if (index === music.length - 1) {
      setCurrentSong(music[0]);
    } else {
      setCurrentSong(music[index + 1]);
    }
  };

  const handleEnded = () => {
    if (audioElem.current) {
      audioElem.current.currentTime = 0;
      if (isPlaying) {
        audioElem.current.play();
      }
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioElem.current?.play();
    } else {
      audioElem.current?.pause();
    }
  }, [isPlaying, currentSong]);

  return (
    <header className="navbar-container">
      <div className="music-container">
        <audio ref={audioElem} src={currentSong} onEnded={handleEnded}></audio>
        <img
          className="music-icon"
          src="images/icons/music.png"
          alt="play music icon"
          onClick={() => setIsPlaying(false)}
        />
        {!isPlaying && (
          <img
            className="cross-icon"
            src="images/icons/cross.png"
            alt="stopped to play music icon"
            onClick={() => setIsPlaying(true)}
          />
        )}
        <img
          className="next-icon"
          src="images/icons/next-arrow.png"
          alt="next music icon"
          onClick={next}
        />
      </div>

      <div className="user-rating-container">
        <div className="user-container">
          <img
            className="user-icon"
            src="images/icons/user.png"
            alt="user icon"
          />
          <p className="user-name">User name</p>
          <img
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
    </header>
  );
}

export default Navbar;
