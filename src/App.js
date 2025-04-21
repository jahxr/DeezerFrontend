import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import Tabs from "./components/Songscomps/Tabs";
import Albums from "./components/Songscomps/Albums";
import SongList from "./components/Songscomps/SongList";
import PlayLists from "./components/Songscomps/Playlists";
import Player from "./components/Player";
import Artists from "./components/Songscomps/Artists";
import ArtistDetail from "./components/Songscomps/ArtistDetail";
import HomePage from "./pages/HomePage";
import Explorer from "./pages/Explorer";
import Favorites from "./pages/Favorites";
import LoginComponent from "./components/logincomps/LoginComponent";
import RegisterComponent from "./components/logincomps/RegisterComponent";
import UserComponent from "./components/usercomps/UserComponent";

function App() {
  // Estado para controlar si se deben mostrar las Tabs
  const [showTabs, setShowTabs] = useState(false);

  // Obtener la ubicación actual usando useLocation
  const location = useLocation();

  // Cambiar el estado de showTabs basado en la ruta actual
  useEffect(() => {
    if (
      location.pathname === "/app/songs" ||
      location.pathname === "/app/albums" ||
      location.pathname === "/app/playlists" ||
      location.pathname === "/app/artists"
    ) {
      setShowTabs(true);
    } else {
      setShowTabs(false);
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col h-screen">
      {/* Contenedor principal */}
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar fijo */}
        <Sidebar />
        {/* Contenedor derecho */}
        <div className="flex-grow flex flex-col">
          {/* Barra de búsqueda */}
          <SearchBar />
          {/* Mostrar Tabs solo si showTabs es true */}
          {showTabs && <Tabs />}
          {/* Contenedor de contenido scrollable */}
          <div className="bg-black flex-grow overflow-y-auto">
            <Routes>
              <Route path="/HomePage" element={<HomePage />} />
              <Route path="/explore" element={<Explorer />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/songs/:searchQuery" element={<SongList />} />
              <Route path="/songs" element={<SongList />} />
              <Route path="/albums" element={<Albums />} />
              <Route path="/playlists" element={<PlayLists />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/artist/:artistName" element={<ArtistDetail />} />
              <Route path="/pages/account" element={<UserComponent />} />
            </Routes>
          </div>
        </div>
      </div>
      {/* Barra del reproductor fija */}
      <Player />
    </div>
  );
  
}

export default function AppWithRouter() {
  return (
    <Router>
      <Routes>
        {/* Ruta de Login que se muestra en la raíz */}
        <Route path="/" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/app/*" element={<App />} />{" "}
        {/* Rutas protegidas después de login */}
      </Routes>
    </Router>
  );
}
