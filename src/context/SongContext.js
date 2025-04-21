import React, { createContext, useContext, useState } from 'react';

// Crear el contexto de la canción
const SongContext = createContext();

// Componente proveedor para envolver la aplicación
export const SongProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null); // Estado global para la canción actual

  const updateCurrentSong = (song) => {
    setCurrentSong(song);
  };

  return (
    <SongContext.Provider value={{ currentSong, updateCurrentSong }}>
      {children}
    </SongContext.Provider>
  );
};

// Custom Hook para acceder al contexto
export const useSong = () => {
  return useContext(SongContext);
};