import React, { useState, useEffect } from "react";
import { usePlaylist } from "../../context/PlaylistContext"; // Importa el contexto global
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaRandom,
  FaRedo,
} from "react-icons/fa";

export default function Reproductor() {
  const { currentSong, playNextSong, playPreviousSong, playlist, updateCurrentSong } = usePlaylist(); // Acceso al contexto global
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);

  useEffect(() => {
    if (!currentSong) {
      setProgress(0);
    } else {
      setProgress(0); // Reinicia el progreso cuando cambia la canción
    }
  }, [currentSong]);

  // Simulación de avance del progreso con manejo de shuffle y repeat
  useEffect(() => {
    let timer;
    if (isPlaying && currentSong) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= currentSong.duracion * 60) {
            if (isRepeating) {
              return 0; // Reinicia la misma canción si está en modo repetición
            } else if (isShuffling) {
              const randomIndex = Math.floor(Math.random() * playlist.length);
              updateCurrentSong(playlist[randomIndex]); // Selecciona una canción aleatoria
              return 0; // Reinicia el progreso
            } else {
              playNextSong(); // Cambia a la siguiente canción
              return 0;
            }
          }
          return prev + 1;
        });
      }, 1000); // Incrementa cada segundo
    }
    return () => clearInterval(timer); // Limpia el intervalo
  }, [isPlaying, currentSong, isRepeating, isShuffling, playNextSong, playlist, updateCurrentSong]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e) => {
    setProgress(Number(e.target.value));
  };

  const toggleShuffle = () => {
    setIsShuffling(!isShuffling);
  };

  const toggleRepeat = () => {
    setIsRepeating(!isRepeating);
  };

  // Actualizada para manejar valores flotantes
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60); // Redondeamos los segundos
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <>
      <div style={styles.controlSection}>
        <div style={styles.controls}>
          <button
            style={{
              ...styles.actionButton,
              color: isShuffling ? "#B560FF" : "#fff",
            }}
            onClick={toggleShuffle}
          >
            <FaRandom />
          </button>

          <FaStepBackward style={styles.icon} onClick={playPreviousSong} />

          {isPlaying ? (
            <FaPause style={styles.playPauseIcon} onClick={togglePlayPause} />
          ) : (
            <FaPlay style={styles.playPauseIcon} onClick={togglePlayPause} />
          )}

          <FaStepForward style={styles.icon} onClick={playNextSong} />

          <button
            style={{
              ...styles.actionButton,
              color: isRepeating ? "#B560FF" : "#fff",
            }}
            onClick={toggleRepeat}
          >
            <FaRedo />
          </button>
        </div>

        <div style={styles.progressContainer}>
          <span style={styles.time}>{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={currentSong?.duracion * 60 || 225}
            value={progress}
            onChange={handleProgressChange}
            style={styles.progressBar}
          />
          <span style={styles.timemax}>
            {formatTime(currentSong?.duracion * 60 || 225)} {/* Convierte la duración flotante */}
          </span>
        </div>
      </div>
    </>
  );
}

const styles = {
  controlSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  controls: {
    position: "relative",
    top: "-14px",
    left: "0px",
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  playPauseIcon: {
    fontSize: "27px",
    cursor: "pointer",
    backgroundColor: "#A238FF",
    borderRadius: "60%",
    padding: "4px",
    transition: "transform 0.3s ease, color 0.3s ease",
  },
  icon: {
    fontSize: "24px",
    cursor: "pointer",
    transition: "transform 0.3s ease, color 0.3s ease",
  },
  progressContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "680px",
  },
  progressBar: {
    position: "relative",
    top: "15px",
    left: "-460px",
    width: "490px",
    height: "5px",
    background: "#555",
    borderRadius: "5px",
    appearance: "none",
    outline: "none",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  time: {
    position: "relative",
    top: "14px",
    left: "-396px",
    fontSize: "12px",
    color: "#aaa",
  },
  timemax: {
    position: "relative",
    top: "14px",
    left: "-516px",
    fontSize: "12px",
    color: "#aaa",
  },
};