import "./music.css";
import { useEffect, useState, useRef } from "react";

const music = [
  "music/music-1.mp3",
  "music/music-2.mp3",
  "music/music-3.mp3",
  "music/music-4.mp3",
];

function Music() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(music[0]);
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
  );
}

export default Music;
