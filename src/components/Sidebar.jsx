import React from "react";
import { FaHome, FaCompass, FaHeart, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

const Sidebar = () => {
  const navigate = useNavigate(); // Crear instancia del hook navigate

  // Función para manejar la navegación
  const handleNavigation = (path) => {
    navigate(path); // Navegar al path proporcionado
  };

  return (
    <aside style={styles.sidebar}>
      <h2 style={styles.logo} onClick={() => handleNavigation("/app/HomePage")}>
        Deezer
      </h2>{" "}
      {/* Al hacer clic en Deezer, redirige a la página principal */}
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          {/* Sección de navegación */}
          <li
            style={styles.navItem}
            onClick={() => handleNavigation("/app/HomePage")}
          >
            <FaHome style={styles.icon} /> Inicio
          </li>
          <li
            style={styles.navItem}
            onClick={() => handleNavigation("/app/explore")}
          >
            <FaCompass style={styles.icon} /> Explorar
          </li>
          <li
            style={styles.navItem}
            onClick={() => handleNavigation("/app/favorites")}
          >
            <FaHeart style={styles.icon} /> Favoritos
          </li>
        </ul>
      </nav>
      <hr style={styles.divider} />
      {/* Sección de playlists */}
      <div style={styles.playlistSection}>
        <h3 style={styles.playlistHeader}>Playlists</h3>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <FaHeart style={styles.icon} /> Canciones Favoritas
          </li>
        </ul>
        <button style={styles.createButton}>
          <FaPlus style={styles.icon} /> Crear Playlist
        </button>
      </div>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: "235px",
    background: "#1e1e1e",
    color: "#fff",
    height: "100vh",
    padding: "20px",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  logo: {
    fontSize: "34px",
    marginBottom: "1px",
    fontWeight: "bold",
    textAlign: "left",
    marginTop: "0px",
    cursor: "pointer", // Cambiar el cursor a pointer para indicar que es clickeable
  },
  nav: {
    marginTop: "0px",
  },
  navList: {
    listStyle: "none",
    padding: 0,
  },
  navItem: {
    fontSize: "18px",
    margin: "10px 0",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    borderRadius: "8px",
    transition: "background 0.3s ease",
  },
  divider: {
    margin: "15px 0",
    border: "0.5px solid #333",
  },
  playlistSection: {
    marginTop: "10px",
  },
  playlistHeader: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  createButton: {
    background: "#333",
    color: "#fff",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "16px",
    marginTop: "10px",
    transition: "background 0.3s ease",
  },
};

export default Sidebar;
