import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { usePlaylist } from "../../context/PlaylistContext"; // Importar el contexto

function SongList() {
  const { searchQuery } = useParams(); // Obtener el término de búsqueda desde la URL
  const [songs, setSongs] = useState([]); // Estado para almacenar las canciones
  const [loading, setLoading] = useState(true); // Estado para indicar carga
  const [error, setError] = useState(""); // Estado para manejar errores

  const { updateCurrentSong, updatePlaylist } = usePlaylist(); // Obtener funciones del contexto

  useEffect(() => {
    // Función para obtener las canciones del backend
    const fetchSongs = async () => {
      try {
        setLoading(true); // Iniciar carga
        setError(""); // Limpiar errores previos

        // Construir la URL con el término de búsqueda
        const url = searchQuery
          ? `http://127.0.0.1:8000/searching?search=${encodeURIComponent(searchQuery)}`
          : `http://127.0.0.1:8000/searching`;

        // Hacer la solicitud al backend
        const response = await axios.get(url);

        console.log("Fetched songs:", response.data.songs); // Ver los resultados en consola

        // Actualizar el estado con las canciones obtenidas
        setSongs(response.data.songs || []); // Asume que el backend devuelve un objeto con un campo "songs"
      } catch (err) {
        // Manejar errores de la solicitud
        setError("Hubo un error al cargar las canciones. Inténtalo de nuevo.");
      } finally {
        setLoading(false); // Finalizar carga
      }
    };

    fetchSongs(); // Llamar a la función para obtener las canciones
  }, [searchQuery]); // Ejecutar cuando cambie el término de búsqueda

  // Función para manejar la selección de una canción
  const handleSongSelect = (song) => {
    console.log("Song clicked:", song); // Asegúrate de que se está ejecutando
    updateCurrentSong(song); // Actualiza la canción actual
    updatePlaylist(songs); // Actualiza la playlist con los resultados de búsqueda
  };

  return (
    <div className="bg-black text-white flex-grow px-4 py-2">
      <h1 className="text-xl mb-4">
        {searchQuery ? `Resultados para: "${searchQuery}"` : "Todas las Canciones"}
      </h1>

      {/* Mostrar estado de carga */}
      {loading && <p>Cargando canciones...</p>}

      {/* Mostrar errores */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Mostrar la tabla de canciones */}
      {!loading && !error && (
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-2">Canción</th>
              <th className="p-2">Artista</th>
              <th className="p-2">Álbum</th>
              <th className="p-2">Duración</th>
            </tr>
          </thead>
          <tbody>
            {songs.length > 0 ? (
              songs.map((song) => (
                <tr
                  key={song.id}
                  className="hover:bg-gray-800 cursor-pointer"
                  onClick={() => handleSongSelect(song)} // Manejar selección
                >
                  <td className="p-2 flex items-center">
                    <img
                      src={song.cover_url}
                      alt={song.title}
                      className="w-10 h-10 mr-2"
                    />
                    {song.title}
                  </td>
                  <td className="p-2">{song.artist}</td>
                  <td className="p-2">{song.album}</td>
                  <td className="p-2">{song.duration.toFixed(2)} mins</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No se encontraron resultados para "{searchQuery}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SongList;