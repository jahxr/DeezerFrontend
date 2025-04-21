import React from "react";
import { UserProvider } from "./context/UserContext"; // Ajusta la ruta según tu estructura de archivos
import { PlaylistProvider } from "./context/PlaylistContext";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <UserProvider>
    <PlaylistProvider>
    <App />
    </PlaylistProvider>
  </UserProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
