import React, { useState, useEffect } from "react";
import axios from "axios";
import { usePlaylist } from "../../context/PlaylistContext"; // Importamos el contexto de la playlist

const CircleCategory = () => {
  const { updatePlaylist, updateCurrentSong} = usePlaylist(); // Funciones del contexto de la playlist
  const [ambientes, setAmbientes] = useState([]);
  const [hovered, setHovered] = useState(null);

  // Lista de imágenes y colores para los ambientes
  const ambientesInfo = {
    Amor: { img: "/images/image1.jpg", color: "#FF5733" },
    Fiesta: { img: "/images/image2.jpg", color: "#33FF57" },
    Triste: { img: "/images/image3.jpg", color: "#3357FF" },
    Motivacional: { img: "/images/image4.jpg", color: "#F39C12" },
    Reflexivo: { img: "/images/image5.jpg", color: "#9B59B6" },
    Aventura: { img: "/images/image6.jpg", color: "#E74C3C" },
    Chill: { img: "/images/image7.jpg", color: "#1ABC9C" },
    Lluvia: { img: "/images/image26.jpg", color: "#9C27B0" }, // Agrega más si es necesario
    Feliz: { img: "/images/image27.jpg", color: "#FFC107" },
    Concentracion: { img: "/images/image29.jpg", color: "#3F51B5" },
  };

  useEffect(() => {
    // Obtener los ambientes del backend
    axios
      .get("http://localhost:8000/ambientes") // Asegúrate de usar la URL correcta
      .then((response) => {
        // Obtener los ambientes de la respuesta
        const allAmbientes = response.data;

        // Seleccionar 7 ambientes aleatorios
        const selectedAmbientes = [];
        while (selectedAmbientes.length < 7) {
          const randomAmbiente =
            allAmbientes[Math.floor(Math.random() * allAmbientes.length)];
          if (!selectedAmbientes.includes(randomAmbiente)) {
            selectedAmbientes.push(randomAmbiente);
          }
        }

        setAmbientes(selectedAmbientes);
      })
      .catch((error) => {
        console.error("Error al obtener los ambientes:", error);
      });
  }, []);

  const handlePlay = (codigo_ambiente) => {
    axios
      .get(`http://127.0.0.1:8000/canciones/ambiente/${codigo_ambiente}`)  // Endpoint para obtener las canciones del ambiente
      .then((response) => {
        const songs = response.data.map((song) => ({
          codigo_cancion: song.codigo_cancion,
          titulo: song.titulo,
          codigo_artista: song.codigo_artista, // Código del artista
          nombre_artista: song.nombre_artista, // Nombre del artista
          url_foto_portada: song.url_foto_portada, // Foto de portada si existe
          duracion: song.duracion,
        }));

        // Actualizamos la lista de reproducción con las canciones obtenidas
        updatePlaylist(songs);

        // Establecemos la primera canción como la canción actual
        if (songs && songs.length > 0) {
          const currentSong = {
            codigo_cancion: songs[0].codigo_cancion,
            titulo: songs[0].titulo,
            codigo_artista: songs[0].codigo_artista, // Código del artista
            nombre_artista: songs[0].nombre_artista, // Nombre del artista
            url_foto_portada: songs[0].url_foto_portada,
            duracion: songs[0].duracion,
          };

          updateCurrentSong(currentSong); // Establecer la canción actual con todos los datos
        }
      })
      .catch((error) => {
        console.error("Error al obtener las canciones del ambiente:", error);
      });
  };


  return (
    <div style={styles.categoryContainer}>
      <h2 style={styles.categoryTitle}>Flow: la banda sonora para tus emociones</h2>
      <p style={styles.categoryDescription}>
        Un mix infinito y personalizado de música que te encanta y nuevos descubrimientos
      </p>
      <div style={styles.circlesContainer}>
        {ambientes.map((ambiente, index) => {
          const ambienteData = ambientesInfo[ambiente.nombre_ambiente];

          return (
            <div key={index} style={styles.circleItem}>
              <div
                style={{
                  ...styles.circle,
                  backgroundImage: `url(${process.env.PUBLIC_URL + ambienteData.img})`,
                  backgroundColor: hovered === index ? ambienteData.color : "transparent",
                  border: "none",
                }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                {hovered === index && (
                  <button
                    style={styles.playButton}
                    onClick={() => handlePlay(ambiente.codigo_ambiente)} // Al hacer clic en el botón de play
                  >
                    ▶
                  </button>
                )}
              </div>
              <span style={styles.circleName}>{ambiente.nombre_ambiente}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  categoryContainer: {
    padding: "20px",
    color: "#fff",
  },
  categoryTitle: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  categoryDescription: {
    fontSize: "16px",
    marginBottom: "20px",
    color: "#a9a6aa",
  },
  circlesContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  circleItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "default",
  },
  circle: {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "all 0.3s ease",
    position: "relative",
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "20px",
    backgroundColor: "#fff",
    color: "#000",
    border: "none",
    padding: "15px",
    borderRadius: "50%",
    cursor: "pointer",
  },
  circleName: {
    marginTop: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
  },
};

export default CircleCategory;