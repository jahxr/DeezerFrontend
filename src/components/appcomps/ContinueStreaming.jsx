import React, { useState } from 'react';

const ContinueStreaming = () => {
  const artists = [
    { name: 'Eva', fans: '642.989 fans', img: '/images/image8.jpg' },
    { name: 'Amir', fans: '605.895 fans', img: '/images/image9.jpg' },
    { name: 'Collectif Métissé', fans: '252.813 fans', img: '/images/image10.jpg' },
    { name: 'TAL', fans: '628.957 fans', img: '/images/image11.jpg' },
    { name: 'RIDSA', fans: '885.768 fans', img: '/images/image12.jpg' },
  ];

  const [hovered, setHovered] = useState(null);
  const [liked, setLiked] = useState(Array(artists.length).fill(false));

  const toggleLike = (index) => {
    const updatedLikes = [...liked];
    updatedLikes[index] = !updatedLikes[index];
    setLiked(updatedLikes);
  };

  return (
    <div style={styles.categoryContainer}>
      <h2 style={styles.categoryTitle}>Continuar con el streaming</h2>
      <div style={styles.circlesContainer}>
        {artists.map((artist, index) => (
          <div key={index} style={styles.circleItem}>
            <div
              style={{
                ...styles.circle,
                backgroundImage: `url(${process.env.PUBLIC_URL + artist.img})`,
                filter: hovered === index ? 'brightness(75%)' : 'brightness(100%)', // Oscurece ligeramente en hover
              }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              {hovered === index && (
                <div style={styles.buttonsContainer}>
                  <button style={styles.playButton}>▶</button>
                  <button
                    style={{
                      ...styles.likeButton,
                      color: liked[index] ? '#B560FF' : '#000000',
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
            <span style={styles.circleText}>
              {artist.name} <br />
              <small style={styles.fansText}>{artist.fans}</small>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  categoryContainer: {
    padding: '20px',
    color: '#fff',
  },
  categoryTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  circlesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  circleItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: '250px',
    height: '250px',
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'filter 0.3s ease',
    position: 'relative',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: '10px',
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    width: '100%',
    transition: 'opacity 0.3s ease', // Animación suave para la aparición
  },
  playButton: {
    fontSize: '18px',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    border: 'none',
    width: '40px', // Ancho fijo
    height: '40px', // Alto fijo
    display: 'flex', // Centramos el contenido
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    cursor: 'pointer',
  },
  likeButton: {
    fontSize: '27px',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    border: 'none',
    width: '40px', // Ancho igual al botón de reproducción
    height: '40px', // Alto igual al botón de reproducción
    display: 'flex', // Centramos el contenido
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    cursor: 'pointer',
  },
  circleText: {
    marginTop: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  fansText: {
    fontSize: '14px',
    color: '#a9a6aa',
  },
};

export default ContinueStreaming;