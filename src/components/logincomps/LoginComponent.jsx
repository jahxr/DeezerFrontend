import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import lbLogo from "../../img/lb.png";
import styles from "../../css/Login.module.css"; // Asegúrate de tener tu CSS aquí
import { useUser } from "../../context/UserContext";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const { setUser } = useUser();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Para mostrar mensajes de error
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/login", {
        correo: email,
        contrasenna: password,
      });
  
      if (response.status === 200) {
        console.log("Datos de usuario:", response.data); // Esto debería mostrar el objeto con id, nombre, y url_foto_perfil
        localStorage.setItem("userId", response.data.id);
        setUser(response.data); // Guardar los datos en el contexto global
        navigate("/app/HomePage"); // Redirigir
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError(
        error.response
          ? error.response.data.detail
          : "No se pudo conectar al servidor. Intenta más tarde."
      );
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.header}>
        <img src={lbLogo} alt="Deezer Logo" className={styles.logo} />
      </div>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h1 className={styles.title}>Iniciar Sesión</h1>
          <form onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className={styles.error}>{error}</p>} {/* Mostrar mensaje de error */}
            <button type="submit" className={styles.loginButton}>
              Acceso
            </button>
          </form>
        </div>
      </div>
      <p className={styles.signupLink2}>
        ¿Aún no estás registrado en Deezer?{" "}
        <span className={styles.registerButton}>
          <Link to="/register">Inscribirse</Link>
        </span>
      </p>
      <p className={styles.signupLink3}>
        Este sitio está protegido por reCAPTCHA. Se aplican{" "}
        <a href="https://policies.google.com/privacy">la Política de privacidad</a>{" "}
        y{" "}
        <a href="https://policies.google.com/terms">los Términos de servicio</a>{" "}
        de Google.
      </p>
    </div>
  );
};

export default LoginComponent;