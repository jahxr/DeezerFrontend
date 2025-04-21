import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import { useUser } from '../../context/UserContext'; // Importar el hook del contexto de usuario
import { usePlaylist } from '../../context/PlaylistContext'; // Importar el hook del contexto de lista de reproducción

export default function Cancion() {
  const [isHearted, setIsHearted] = useState(false); // Estado para el botón de corazón
  const [isDisliked, setIsDisliked] = useState(false); // Estado para el botón de dislike
  const { user } = useUser(); // Obtener el usuario del contexto
  const { currentSong, updateCurrentSong } = usePlaylist(); // Usar el contexto de la lista de reproducción

  const toggleHeart = () => {
    setIsHearted(!isHearted);
    if (!isHearted) setIsDisliked(false); // Si se activa el corazón, desactivar dislike
  };

  // Obtener la última canción al cargar el componente
  useEffect(() => {
    // Si ya tenemos la canción, no hacer la consulta
    if (currentSong) return;

    if (user) {
      console.log('ID del usuario:', user.id);

      // Hacer la solicitud GET para obtener la última canción
      axios
        .get(`http://127.0.0.1:8000/last-song/${user.id}`)
        .then((response) => {
          console.log('Respuesta del backend:', response.data);

          // Actualizar el estado con los datos de la canción
          updateCurrentSong(response.data); // Actualizar la canción global
        })
        .catch((error) => {
          console.error('Error al obtener la canción:', error);

          // Si no hay historial o ocurre un error, cargar la canción con ID 1
          axios
            .get('http://127.0.0.1:8000/song/1') // Cambiar esta URL para que apunte a la canción con ID = 1
            .then((response) => {
              console.log('Cargando canción predeterminada (ID 1):', response.data);
              updateCurrentSong(response.data); // Actualizar con la canción ID 1
            })
            .catch((error) => {
              console.error('Error al cargar la canción predeterminada:', error);
            });
        });
    }
  }, [user, currentSong, updateCurrentSong]); // Solo ejecutar si user está disponible y currentSong es null

  return (
    <>
      {/* Información de la pista */}
      {currentSong ? (
        <div style={styles.trackInfo}>
          <img 
            src={currentSong.url_foto_portada || '/images/default-song.png'} 
            alt="Portada de la canción" 
            style={styles.songImage}
          />
          <span>{currentSong.nombre_artista}</span><span> {currentSong.titulo}</span>
          <button style={styles.heartButton} onClick={toggleHeart}>
            <FaHeart style={{ color: isHearted ? '#FF4081' : '#fff' }} />
          </button>
        </div>
      ) : (
        <p>Cargando información de la canción...</p>
      )}
    </>
  );
}

const styles = {
  trackInfo: {
    fontSize: '16px',
    fontWeight: 'bold',
    justifyContent: 'space-between',
    display: 'flex',
    width: '100%',
    marginBottom: '5px',
    paddingLeft: '20px',
    paddingRight: '550px',
  },
  heartButton: {
    fontSize: '24px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    padding: 0,
    marginLeft: '10px',
  },
  songImage: {
    width: '50px',
    height: '50px',
    marginLeft: '10px',
    borderRadius: '5px',
  },
};