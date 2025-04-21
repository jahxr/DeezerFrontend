import React from 'react';
import ExplorerCategory from '../components/explorercomps/ExplorerCategory'; // Asegúrate de importar el nuevo componente
import Artists2025 from '../components/explorercomps/Artists2025';
import Albums2024 from '../components/explorercomps/Albums2024';
import AlbumsOfTheWeek from '../components/explorercomps/AlbumsOfTheWeek';

const Explorer = () => {
  return (
    <div style={styles.pageContainer}>
      {/* Aquí se muestra la categoría */}
      <ExplorerCategory /> 
      <Artists2025 />
      <Albums2024 />
      <AlbumsOfTheWeek/>
    </div>
  );
};

const styles = {
  pageContainer: {
    padding: '20px',
    background: '#121212',
    color: '#fff',
    height: '100vh',
  },
};

export default Explorer;