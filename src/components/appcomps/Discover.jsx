import React, { useState } from 'react';

const Discover = () => {
  const discoveries = [
    { desc: 'Con RIDSA, Black M, Trois Cafés Gourmands, Jeck', imgLeft: '/images/image1.jpg', imgRight: '/images/image2.jpg' },
    { desc: 'Con Niro, Mig, Ninho, Werenoi', imgLeft: '/images/image3.jpg', imgRight: '/images/image4.jpg' },
    { desc: 'Con Rvfv, Beny Jr, Lowa OD, HENOCK CORTES', imgLeft: '/images/image5.jpg', imgRight: '/images/image6.jpg' },
    { desc: 'Con Ninho, L2B, døpelym, NAZAKEBLACK', imgLeft: '/images/image7.jpg', imgRight: '/images/image8.jpg' },
    { desc: 'Con Hiro, Lylah, Wilson, Lisandro Cuxi', imgLeft: '/images/image9.jpg', imgRight: '/images/image10.jpg' },
  ];

  const [hovered, setHovered] = useState(null);

  return (
    <div style={styles.categoryContainer}>
      <h2 style={styles.categoryTitle}>Descubrir</h2>
      <div style={styles.gridContainer}>
        {discoveries.map((item, index) => (
          <div
            key={index}
            style={{
              ...styles.card,
              filter: hovered === index ? 'brightness(75%)' : 'brightness(100%)',
            }}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Parte superior DAILY */}
            <div style={styles.dailySection}>
              <span style={styles.dailyText}>DAILY</span>
            </div>
            {/* Parte inferior con imágenes */}
            <div style={styles.imagesContainer}>
              <div
                style={{
                  ...styles.imageHalf,
                  backgroundImage: `url(${process.env.PUBLIC_URL + item.imgLeft})`,
                }}
              />
              <div
                style={{
                  ...styles.imageHalf,
                  backgroundImage: `url(${process.env.PUBLIC_URL + item.imgRight})`,
                }}
              />
            </div>
            {/* Botón central */}
            {hovered === index && (
              <button style={styles.playButton}>▶</button>
            )}
            {/* Descripción */}
            <span style={styles.description}>{item.desc}</span>
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
  gridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  card: {
    width: '250px',
    height: '250px',
    borderRadius: '10px',
    backgroundColor: '#111', // Fondo para evitar blancos si no hay imagen
    overflow: 'hidden', // Recorta las imágenes en los bordes
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'filter 0.3s ease',
  },
  dailySection: {
    backgroundColor: '#1ABC9C',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
  },
  dailyText: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
  },
  imagesContainer: {
    display: 'flex',
    height: '50%',
  },
  imageHalf: {
    flex: 1,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '20px',
    backgroundColor: '#FFFFFF',
    color: '#000',
    border: 'none',
    padding: '15px',
    borderRadius: '50%',
    cursor: 'pointer',
  },
  description: {
    marginTop: '10px',
    fontSize: '14px',
    color: '#a9a6aa',
    textAlign: 'center',
  },
};

export default Discover;