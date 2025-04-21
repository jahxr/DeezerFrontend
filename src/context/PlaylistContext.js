import React, { createContext, useState, useContext, useEffect } from "react";

// Crear el contexto de la lista de reproducción
const PlaylistContext = createContext();

// Componente proveedor para envolver la aplicación
export const PlaylistProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null); // Estado global para la canción actual
  const [playlist, setPlaylist] = useState([]); // Estado global para la lista de reproducción
  // Actualiza la canción actual
  const updateCurrentSong = (song) => {
    setCurrentSong(song);
  };

  // Agregar canciones a la lista de reproducción
  const updatePlaylist = (songs) => {
    setPlaylist(songs);
  };

  // Función para cambiar a la siguiente canción
  const playNextSong = () => {
    if (!currentSong || playlist.length === 0) return;

    const currentIndex = playlist.findIndex((song) => song.codigo_cancion === currentSong.codigo_cancion);
    const nextSong = playlist[currentIndex + 1] || playlist[0]; // Si no hay siguiente canción, vuelve al principio

    setCurrentSong(nextSong);
  };

  // Función para cambiar a la canción anterior
  const playPreviousSong = () => {
    if (!currentSong || playlist.length === 0) return;

    const currentIndex = playlist.findIndex((song) => song.codigo_cancion === currentSong.codigo_cancion);
    const previousSong = playlist[currentIndex - 1] || playlist[playlist.length - 1]; // Si no hay anterior, va al final

    setCurrentSong(previousSong);
  };


  return (
    <PlaylistContext.Provider
      value={{
        currentSong,
        playlist,
        updateCurrentSong,
        updatePlaylist,
        playNextSong,
        playPreviousSong,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

// Custom Hook para acceder al contexto
export const usePlaylist = () => {
  return useContext(PlaylistContext);
};