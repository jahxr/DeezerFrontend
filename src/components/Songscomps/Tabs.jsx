import React from "react";
import { Link } from "react-router-dom";

function Tabs() {
  const tabs = [
    { label: "Canciones", path: "/app/songs" },
    { label: "Álbumes", path: "/app/albums" },
    { label: "Playlists", path: "/app/playlists" },
    { label: "Artistas", path: "/app/artists" },
  ];

  return (
    <div className="bg-black text-white flex gap-4 px-4 py-2">
      {tabs.map((tab, index) => (
        <Link key={index} to={tab.path} className="hover:underline">
          {tab.label}
        </Link>
      ))}
    </div>
  );
}

export default Tabs;
