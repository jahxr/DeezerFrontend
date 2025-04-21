import React, { createContext, useState, useContext } from "react";

// Crear el contexto
const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Aquí se almacena la información del usuario

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para usar el contexto de usuario
export const useUser = () => {
  return useContext(UserContext);
};

export const useUserId = () => {
  const { user } = useUser();
  return user?.id; // Retorna solo el ID del usuario
};