import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../../css/User.module.css";

const UserComponent = () => {
  const [userData, setUserData] = useState({
    nombre_usuario: "",
    correo: "",
    url_foto_perfil: "",
    edad: "",
    // Agrega otros campos si es necesario
  });

  const [image, setImage] = useState(null);
  const [hover, setHover] = useState(false);

  // Simula el id del usuario actual o usa el id del usuario autenticado
  const userId = parseInt(localStorage.getItem("userId")); // Reemplazar con el ID real del usuario (puede venir del contexto o de un token)

  // Función para obtener los datos del usuario
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/userInfo/${userId}`);
      // Asume que la respuesta contiene el usuario y los campos que necesitamos
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <body>
      <div className={styles.divPage}>
        <div className={styles.divContainer}>
          <div>
            <h2 className={styles.tittleForm}>Mi información</h2>
            <hr className={styles.barHorizontal} />
            <div className={styles.divForm}>
              <div className={styles.divFormSub1}>
                <div className={styles.divPhoto}>
                  {/* Si hay una imagen cargada, la mostramos; si no, mostramos el ícono */}
                  {image || userData.url_foto_perfil ? (
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                        cursor: "pointer",
                      }}
                      onMouseEnter={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}
                    >
                      <img
                        src={image || userData.url_foto_perfil}
                        alt="Foto de perfil"
                        style={{
                          width: "150px",
                          height: "150px",
                          borderRadius: "50%",
                          cursor: "pointer",
                        }}
                      />
                      {hover && (
                        <span
                          className="material-symbols-outlined"
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            fontSize: "24px",
                            display: "block",
                            backgroundColor: "white",
                            borderRadius: "50%",
                            padding: "20px",
                            color: "black",
                          }}
                        >
                          photo_camera
                        </span>
                      )}
                    </div>
                  ) : (
                    <i
                      className="fa-regular fa-user"
                      style={{ fontSize: "55px", cursor: "pointer" }}
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                    ></i>
                  )}
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <div className={styles.divInfo}>
                  <h3 className={styles.userName}>{userData.nombre_usuario || "Usuario"}</h3>
                  <p className={styles.fontSteper}>Estás disfrutando de Deezer Free.</p>
                </div>
                <Link className={styles.suscriptionLink}>
                  Administrar mi suscripción
                </Link>
              </div>

              <div className={styles.divFormSub2}>
                <h3 style={{ fontSize: "20px" }}>Acceso</h3>
                <hr className={styles.barHorizontal} />
                <div className={styles.formDatos1}>
                  <div className={styles.formControl}>
                    <label htmlFor="">Su correo electronico: </label>
                    <div className={styles.formInput}>
                      <input
                        type="text"
                        value={userData.correo || ""}
                        disabled
                      />
                      <Link className={styles.editButton}>
                        <i className="bx bx-pencil"></i>
                      </Link>
                    </div>
                  </div>
                  <div className={styles.formControl}>
                    <label htmlFor="">Su contraseña: </label>
                    <div className={styles.formInput}>
                      <input type="password" value={"*****"} disabled />
                      <Link className={styles.editButton}>
                        <i className="bx bx-pencil"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.divFormSub3}>
                <h3 style={{ fontSize: "20px" }}>
                  Información de Deezer que pueden ver otros usuarios de Deezer
                </h3>
                <hr className={styles.barHorizontal} />
                <div className={styles.formDatos1}>
                  <div className={styles.formControl}>
                    <label htmlFor="">Me identifico como</label>
                    <div className={styles.formInput}>
                      <div className={styles.radioControl}>
                        <input
                          id="masculino"
                          type="radio"
                          name="gender"
                          value={"masculino"}
                          defaultChecked
                        />
                        <label htmlFor="masculino">Masculino</label>
                      </div>
                      <div className={styles.radioControl}>
                        <input
                          id="femenino"
                          type="radio"
                          name="gender"
                          value={"femenino"}
                        />
                        <label htmlFor="femenino">Femenino</label>
                      </div>
                      <div className={styles.radioControl}>
                        <input
                          id="noBinario"
                          type="radio"
                          name="gender"
                          value={"no binario"}
                        />
                        <label htmlFor="noBinario">No binario</label>
                      </div>
                    </div>
                  </div>
                  <div className={styles.formControl}>
                    <label htmlFor="">Nombre de usuario </label>
                    <div className={styles.formInput}>
                      <input
                        type="text"
                        value={userData.nombre_usuario || ""}
                        onChange={(e) => setUserData({ ...userData, nombre_usuario: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.divFormSub4}>
                <h3 style={{ fontSize: "20px" }}>Información privada</h3>
                <hr className={styles.barHorizontal} />
                <div className={styles.formDatos2}>
                  <div className={styles.groupButtons}>
                    <Link className={styles.settingPrivacy}>
                      Configuración de privacidad
                    </Link>
                    <Link className={styles.dataPersonal}>
                      Mis datos personales
                    </Link>
                  </div>
                  {/* Aquí podemos ocultar la fecha de nacimiento o el idioma si no quieres mostrarlos */}
                </div>
              </div>
            </div>
          </div>
          <hr className={styles.barHorizontal} />
          <div className={styles.divEliminar}>
            <Link className={styles.dataPersonal}>Eliminar mi cuenta</Link>
          </div>
        </div>
      </div>
    </body>
  );
};

export default UserComponent;