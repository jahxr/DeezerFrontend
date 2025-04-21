import React, { useState, useEffect } from "react";
import axios from "axios";
import { usePlaylist } from "../../context/PlaylistContext"; // Importar el contexto

const Albums2024 = () => {
  const [albums, setAlbums] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [liked, setLiked] = useState([]);
  const { updatePlaylist, updateCurrentSong } = usePlaylist();  // Usar el contexto para actualizar la playlist y la canción actual

  useEffect(() => {
    // Solicitar los datos al backend
    const fetchAlbums = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/top-albumes-reproducidos");
        setAlbums(response.data);
        setLiked(Array(response.data.length).fill(false)); // Inicializar el estado de "likes"
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };
    fetchAlbums();
  }, []);

  const toggleLike = (index) => {
    const updatedLikes = [...liked];
    updatedLikes[index] = !updatedLikes[index];
    setLiked(updatedLikes);
  };

  // Función para manejar el clic en el botón de reproducción
  const handlePlay = (albumId) => {
    // Obtener las canciones del álbum
    axios
      .get(`http://127.0.0.1:8000/album-songs/${albumId}`)  // Endpoint para obtener las canciones del álbum
      .then((response) => {
        const songs = response.data;  // Lista de canciones
        updatePlaylist(songs);         // Actualizar la lista de reproducción global

        // Seleccionar la primera canción del álbum para reproducir
        if (songs && songs.length > 0) {
          updateCurrentSong(songs[0]); // Establecer la canción actual
        }
      })
      .catch((error) => {
        console.error("Error fetching album songs:", error);
      });
  };

  return (
    <div style={styles.categoryContainer}>
      <h2 style={styles.categoryTitle}>Álbumes que marcaron el 2024</h2>
      <div style={styles.squaresContainer}>
        {albums.map((album, index) => (
          <div key={album.codigo_album} style={styles.squareItem}>
            <div
              style={{
                ...styles.square,
                backgroundImage: `url(${process.env.PUBLIC_URL + album.url_portada})`,
                filter: hovered === index ? "brightness(75%)" : "brightness(100%)",
              }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              {hovered === index && (
                <div style={styles.buttonsContainer}>
                  <button
                    style={styles.playButton}
                    onClick={() => handlePlay(album.codigo_album)}  // Llamada al handlePlay
                  >
                    ▶
                  </button>
                  <button
                    style={{
                      ...styles.likeButton,
                      color: liked[index] ? "#B560FF" : "#000000",
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); // Evita que el evento afecte al hover
                      toggleLike(index);
                    }}
                  >
                    ♥
                  </button>
                </div>
              )}
            </div>
            <div style={styles.albumInfo}>
              <div style={styles.albumName}>{album.titulo}</div>
              <div style={styles.albumArtist}>{album.nombre_artista}</div>
              <div style={styles.albumReleaseDate}>{album.fecha_lanzamiento}</div>
            </div>
          </div>
        ))}
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
    marginBottom: "20px",
  },
  squaresContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  squareItem: {
    width: "250px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  square: {
    width: "100%",
    height: "250px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "10px",
    transition: "filter 0.3s ease",
    position: "relative",
  },
  buttonsContainer: {
    position: "absolute",
    bottom: "10px",
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    width: "100%",
  },
  playButton: {
    fontSize: "18px",
    backgroundColor: "#FFFFFF",
    color: "#000000",
    border: "none",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    cursor: "pointer",
  },
  likeButton: {
    fontSize: "27px",
    backgroundColor: "#FFFFFF",
    color: "#000000",
    border: "none",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    cursor: "pointer",
  },
  albumInfo: {
    marginTop: "10px",
    textAlign: "center",
    lineHeight: "1.5",
  },
  albumName: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  albumArtist: {
    fontSize: "14px",
    color: "#a9a6aa",
  },
  albumReleaseDate: {
    fontSize: "12px",
    color: "#7d7a80",
  },
};

export default Albums2024;