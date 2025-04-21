import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate(); // Hook para redirigir

  const handleLogin = () => {
    // Redirigir a la página principal (ajusta la ruta según corresponda)
    navigate("/app/HomePage");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-800 to-black">
      <div className="bg-black bg-opacity-70 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Iniciar Sesión
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              placeholder="Ingresa tu correo"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded focus:outline-none transition"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
