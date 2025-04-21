import React, { useState } from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Asegúrate de importar el contexto

  

const styles = {
  navbar: {
    background: "#000000",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
    zIndex: 10,
    position: "sticky",
    top: 0,
    marginLeft: "0px",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    background: "#29282D",
    borderRadius: "5px",
    width: "375px",
    padding: "10px",
    transition: "border-color 0.3s, background-color 0.3s",
    boxSizing: "border-box",
    flexShrink: 0,
  },
  search: {
    background: "transparent",
    color: "#fff",
    border: "none",
    outline: "none",
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    width: "calc(100% - 20px)",
    boxSizing: "border-box",
  },
  searchIcon: {
    marginRight: "10px",
    fontSize: "18px",
  },
  profile: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  profileIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#bbb",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    cursor: "pointer",
    position: "relative",
  },
  notificationIcon: {
    fontSize: "24px",
    cursor: "pointer",
  },
  dropdownMenu: {
    position: "absolute",
    top: "50px",
    right: "0",
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: "8px",
    width: "200px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    zIndex: 20,
    padding: "10px 0",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    cursor: "pointer",
  },
  dropdownItem: {
    padding: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  userInfo: {
    padding: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#444",
  },
  userImage: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  },
};

const Navbar = () => {
  const { user } = useUser(); // Usamos el contexto para obtener el usuario
  const [searchQuery, setSearchQuery] = useState(""); // Almacena la búsqueda del usuario
  const [isFocused, setIsFocused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Controla la visibilidad del menú
  const navigate = useNavigate(); // Hook para redirigir

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario
    if (searchQuery.trim() !== "") {
      navigate(`/app/songs/${encodeURIComponent(searchQuery)}`);
    } else {
      navigate(`/app/songs`);
    }
  };

  const handleProfileClick = () => {
    setMenuOpen(!menuOpen); // Alterna el estado del menú
  };

  const handleMenuItemClick = (path) => {
    navigate(path); // Navega a la página correspondiente
    setMenuOpen(false); // Cierra el menú después de hacer clic
  };

  return (
    <header style={styles.navbar}>
      <form
        onSubmit={handleSearchSubmit}
        style={{
          ...styles.searchContainer,
          border: isFocused ? "2px solid #A020F0" : "2px solid #29282D",
          background: isFocused ? "#3a393d" : "#29282D",
        }}
      >
        <FaSearch style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Artistas, canciones, podcasts..."
          style={styles.search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Actualiza el estado de la búsqueda
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </form>
      <div style={styles.profile}>
        <FaBell style={styles.notificationIcon} />
        <div style={styles.profileIcon} onClick={handleProfileClick}>
          {/* Imagen de usuario */}
          <img
            src={user?.url_foto_perfil || "/images/default-profile.png"} // Usa la URL de la foto del perfil desde el usuario
            alt="Usuario"
            style={styles.userImage}
          />
        </div>
        {menuOpen && (
          <div style={styles.dropdownMenu}>
            <div
              style={styles.userInfo}
              onClick={() => handleMenuItemClick("/favorites")}
            >
              <img
                src={user?.url_foto_perfil || "/images/default-profile.png"} // Usa la URL de la foto del perfil desde el usuario
                alt="Usuario"
                style={styles.userImage}
              />
              <span>{user?.nombre || "Usuario"}</span>{" "}
              {/* Usa el nombre correcto del usuario */}
            </div>
            <div
              style={styles.dropdownItem}
              onClick={() => handleMenuItemClick("/app/pages/account")}
            >
              <span>Ajustes de cuenta</span>
            </div>
            <div
              style={styles.dropdownItem}
              onClick={() => handleMenuItemClick("/pages/subscription")}
            >
              <span>Gestionar mi suscripción</span>
            </div>
            <div
              style={styles.dropdownItem}
              onClick={() => handleMenuItemClick("/")}
            >
              <span>Desconectarse</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
