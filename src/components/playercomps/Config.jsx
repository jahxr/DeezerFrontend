import React, { useState } from "react";

import { FaVolumeMute, FaVolumeUp, FaThumbsDown, FaCog } from "react-icons/fa";

export default function Config() {
  const [volume, setVolume] = useState(50); // Estado del volumen
  const [isMuted, setIsMuted] = useState(false);
  const [showVolume, setShowVolume] = useState(false); // Estado para mostrar/ocultar la barra de volumen
  const [isDisliked, setIsDisliked] = useState(false); // Estado para el botón de dislike
  const [ setIsHearted] = useState(false); // Estado para el botón de corazón
  const [isConfigActive, setIsConfigActive] = useState(false); // Estado para el botón de configuración
  const [soundQuality, setSoundQuality] = useState("128kb/s"); // Estado para la calidad de sonido
  const [normalizeAudio, setNormalizeAudio] = useState(false); // Estado para normalizar audio
  const [syncQueue, setSyncQueue] = useState(false); // Estado para sincronización de cola

  let hideVolumeTimeout; // Variable para el temporizador

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    setIsMuted(false); // Al ajustar el volumen, quitar mute
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleDislike = () => {
    setIsDisliked(!isDisliked);
    if (!isDisliked) setIsHearted(false); // Si se activa dislike, desactivar el corazón
  };

  const toggleConfig = () => {
    setIsConfigActive(!isConfigActive);
  };

  const handleMouseEnter = () => {
    clearTimeout(hideVolumeTimeout); // Cancela el temporizador si el ratón vuelve
    setShowVolume(true); // Muestra la barra de volumen
  };

  const handleMouseLeave = () => {
    hideVolumeTimeout = setTimeout(() => {
      setShowVolume(false); // Oculta la barra de volumen después de 300ms
    }, 300);
  };

  const handleInteraction = () => {
    clearTimeout(hideVolumeTimeout); // Evita que desaparezca mientras interactúas con la barra
  };

  const handleQualityChange = (quality) => {
    setSoundQuality(quality);
  };

  return (
    <div style={styles.actionButtons}>
      <button style={styles.actionButton} onClick={toggleDislike}>
        <FaThumbsDown style={{ color: isDisliked ? "#B560FF" : "#fff" }} />
      </button>

      {/* Control de volumen */}
      <div
        style={styles.volumeContainer}
        onMouseEnter={handleMouseEnter} // Mostrar barra al pasar el ratón
        onMouseLeave={handleMouseLeave} // Inicia el temporizador para ocultar la barra
      >
        <button
          style={{
            ...styles.volumeButton,
            color: isMuted ? "#B560FF" : "#fff", // Cambia el color cuando esté en mute
          }}
          onClick={toggleMute}
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        {showVolume && (
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume} // Si está en mute, la barra muestra 0
            onChange={handleVolumeChange}
            onMouseDown={handleInteraction} // Evita esconder la barra mientras interactúas
            onMouseUp={handleInteraction}
            style={styles.volumeSlider}
          />
        )}
      </div>

      {/* Botón de configuración */}
      <button
        style={{
          ...styles.actionButton,
          color: isConfigActive ? "#B560FF" : "#fff", // Cambia el color cuando está activo
        }}
        onClick={toggleConfig}
      >
        <FaCog />
      </button>

      {/* Menú de configuración */}
      {isConfigActive && (
        <div style={styles.configMenu}>
          <div>
            <span>Calidad de sonido</span>
            <div
              style={styles.option}
              onClick={() => handleQualityChange("128kb/s")}
            >
              <input
                type="radio"
                checked={soundQuality === "128kb/s"}
                readOnly
              />{" "}
              Estándar 128kb/s
            </div>
            <div
              style={styles.option}
              onClick={() => handleQualityChange("320kb/s")}
            >
              <input
                type="radio"
                checked={soundQuality === "320kb/s"}
                readOnly
              />{" "}
              Superior 320kb/s
            </div>
            <div
              style={styles.option}
              onClick={() => handleQualityChange("Lossless")}
            >
              <input
                type="radio"
                checked={soundQuality === "Lossless"}
                readOnly
              />{" "}
              Alta fidelidad (Calidad sin pérdida)
            </div>
          </div>
          <div>
            <span>Normalizar audio</span>
            <input
              type="checkbox"
              checked={normalizeAudio}
              onChange={() => setNormalizeAudio(!normalizeAudio)}
            />
          </div>
          <div>
            <span>Sincronización de la cola de reproducción</span>
            <input
              type="checkbox"
              checked={syncQueue}
              onChange={() => setSyncQueue(!syncQueue)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  actionButtons: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "10px",
    marginRight: "35px",
  },
  actionButton: {
    position: "relative",
    top: "3px",
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "20px",
    cursor: "pointer",
    padding: "10px",
  },
  volumeContainer: {
    position: "relative",
    top: "3px",
    display: "flex",
    alignItems: "center",
    marginRight: "0px",
  },
  volumeButton: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "24px",
    cursor: "pointer",
  },
  volumeSlider: {
    position: "absolute",
    top: "-25px",
    right: "-55px",
    width: "240px",
    height: "5px",
    background: "#555",
    borderRadius: "5px",
    appearance: "none",
    outline: "none",
    cursor: "pointer",
    transition: "opacity 0.3s ease",
  },
  configMenu: {
    background: "#333",
    color: "#fff",
    padding: "10px",
    position: "absolute",
    top: "-200px", // Mueve el menú hacia arriba
    left: "-130px", // Mueve el menú hacia la izquierda
    borderRadius: "8px",
    width: "250px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  option: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
    cursor: "pointer",
  },
};
