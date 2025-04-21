import { useState } from "react";
import axios from "axios"; // Importa axios
import lbLogo from "../../img/lb.png";
import { useNavigate} from "react-router-dom";
import styles from "../../css/Register.module.css";

const RegisterComponent = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [email, setEmail] = useState(""); // Para almacenar el correo
  const [password, setPassword] = useState(""); // Para almacenar la contraseña
  const [name, setName] = useState(""); // Para almacenar el nombre
  const [age, setAge] = useState(""); // Para almacenar la edad
  const [gender, setGender] = useState(""); // Para almacenar el género
  const [error, setError] = useState(""); // Para mostrar mensajes de error
  const navigate = useNavigate();

  const nextSection = () => {
    setCurrentSection((prevSection) => prevSection + 1);
  };

  const previousSection = () => {
    setCurrentSection((prevSection) => Math.max(prevSection - 1, 1));
  };

  const getProgressText = () => {
    return `Paso ${currentSection} de 3`;
  };

  const checkEmailAvailability = async () => {
    try {
      // Verificar si el correo está registrado en el backend
      const response = await axios.get(`http://127.0.0.1:8000/users/email/${email}`);
      if (response.data.exists) {
        // Si el correo ya está registrado
        setError("Este correo ya está registrado.");
      } else {
        // Si el correo no está registrado
        setError("");
        nextSection(); // Pasar a la siguiente sección
      }
    } catch (error) {
      setError("Error al verificar el correo.");
    }
  };

  const handleSubmitRegistration = async (e) => {
    e.preventDefault();
  
    // Mapear los valores de género a números
    const genderMap = {
      "female": 2,   // Femenino
      "male": 1,     // Masculino
      "other": 3,    // No binario
      "otros": 4,    // Otros
    };
  
    const genderValue = genderMap[gender] || 0; // Asignar 0 si no hay un valor válido
  
    try {
      // Obtener el último código de usuario
      const lastUserResponse = await axios.get("http://127.0.0.1:8000/users/last");
      const lastUser = lastUserResponse.data;
  
      const newUserId = lastUser ? lastUser.codigo_usuario + 1 : 1; // Obtener el siguiente ID
  
      // Obtener la fecha actual en formato yyyy-mm-dd
      const currentDate = new Date().toISOString().split('T')[0]; // Formato: "YYYY-MM-DD"
  
      // Realizar el registro del nuevo usuario
      const response = await axios.post("http://127.0.0.1:8000/users", {
        codigo_usuario: newUserId,
        codigo_suscripcion_actual: 1,  // Como mencionaste, el código de suscripción será "1"
        correo: email,
        contrasenna: password,
        nombre_usuario: name,
        edad: age,
        codigo_identidad: genderValue, // Enviar un valor numérico
        fecha_registro: currentDate, // Enviar la fecha actual
        url_foto_perfil: "", // Si tienes un campo opcional, por ejemplo, foto de perfil
      });

      
      if (response.status === 200) {
        // Si las credenciales son correctas, redirigir a la página principal
        alert("Usuario registrado con éxito.");
        navigate("/");
      }

      // Aquí podrías redirigir a otra página o mostrar un mensaje de éxito
    } catch (error) {
      console.error("Error al registrar el usuario", error);
      setError("Error al registrar el usuario.");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img src={lbLogo} alt="Deezer Logo" className={styles.logo} />
      </div>
      <div className={styles.loginContainer}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          {currentSection > 1 && (
            <button
              onClick={previousSection}
              style={{
                background: "none",
                border: "none",
                color: "#ccc",
                fontSize: "24px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              &#x2190;
            </button>
          )}
          <span style={{ color: "#ccc", fontSize: "16px" }}>
            {getProgressText()}
          </span>
        </div>

        {/* Sección 1: Verificar Correo */}
        {currentSection === 1 && (
          <div id="section-1" className={`${styles.loginCard} ${styles.section}`} style={{ width: "481px" }}>
            <h1 className={styles.title}>Introduce tu correo electrónico</h1>
            <form onSubmit={checkEmailAvailability}>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button
                type="button"
                className={styles.loginButton}
                onClick={checkEmailAvailability}
              >
                Continuar
              </button>
            </form>
          </div>
        )}

        {/* Sección 2: Crear Contraseña */}
        {currentSection === 2 && (
          <div id="section-2" className={`${styles.loginCard} ${styles.section}`} style={{ width: "481px" }}>
            <h1 className={styles.title}>Crear una Contraseña</h1>
            <form>
              <div className={styles.inputGroup}>
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Crea una contraseña"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  className={styles.loginButton}
                  onClick={nextSection}
                >
                  Continuar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Sección 3: Datos Personales */}
        {currentSection === 3 && (
          <div id="section-3" className={`${styles.loginCard} ${styles.section}`} style={{ width: "481px" }}>
            <h1 className={styles.title}>Introduzca sus datos personales</h1>
            <form onSubmit={handleSubmitRegistration}>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Nombre de usuario</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ingresa tu nombre completo"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="age">Edad</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  placeholder="Ingresa tu edad"
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="gender">Identidad</label>
                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="female">Identidad</option>
                  <option value="female">Femenino</option>
                  <option value="male">Masculino</option>
                  <option value="other">No binario</option>
                  <option value="otros">Otros</option>
                </select>
              </div>
              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.loginButton}>
                  Registrarse gratis
                </button>
              </div>
            </form>
            <p className={styles.signupLink3}>
              Al hacer clic en &quot;Registrate gratis&quot;, aceptas crear una cuenta y aceptas los{" "}
              <a href="https://www.deezer.com/legal/cgu">Términos y Condiciones de Uso</a> y la{" "}
              <a href="https://www.deezer.com/legal/personal-datas">Política de Privacidad</a>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterComponent;