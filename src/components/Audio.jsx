import { useEffect, useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { Volume2, VolumeX } from "lucide-react";
import audioFile from "../assets/high.mp3"; 

const AudioToggleButton = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current.audioEl.current;
      audio.play();
    }
  },[]);

  const togglePlay = () => {
    if (!audioRef.current || !audioRef.current.audioEl.current) return;
    const audio = audioRef.current.audioEl.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => console.error("Playback error:", error));
    }
    setIsPlaying((prev) => !prev);
  };

  return (
    <div>
      {/* Hidden React Audio Player */}
      <ReactAudioPlayer src={audioFile} loop volume={0.5} ref={audioRef} />

      {/* Floating Toggle Button */}
      <button
        onClick={togglePlay}
        style={{
          position: "absolute",
          top: "13px",
          right: "34px",
          zIndex: 9999, // High z-index
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        {isPlaying ? <Volume2 size={28} color="#ff69b4" /> : <VolumeX size={28} color="#ff69b4" />}
      </button>
    </div>
  );
};

export default AudioToggleButton;
