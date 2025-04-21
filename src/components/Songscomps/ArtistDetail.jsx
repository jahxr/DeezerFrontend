import React, { useState } from "react";
import { useParams } from "react-router-dom";
import artistImage from "../../img/images.jpeg";

const ArtistDetail = () => {
  const { artistName } = useParams();
  const [activeTab, setActiveTab] = useState("discografia");

  const artistData = {
    name: artistName || "Artista Desconocido",
    fans: "2434 fans",
    image: artistImage,
  };

  const artists = [
    {
      name: "El Makabelico",
      fans: "63,179 fans",
      image: require("../../img/505.jpeg"),
    },
    {
      name: "5050 Flow Malandro",
      fans: "2,458 fans",
      image: require("../../img/505.jpeg"),
    },
    {
      name: "Chino El Don",
      fans: "1,480 fans",
      image: require("../../img/505.jpeg"),
    },
    {
      name: "La Santa Grifa",
      fans: "405,129 fans",
      image: require("../../img/505.jpeg"),
    },
    {
      name: "Jan Glack",
      fans: "1,741 fans",
      image: require("../../img/505.jpeg"),
    },
    {
      name: "Cartel De Santa",
      fans: "2,171,736 fans",
      image: require("../../img/505.jpeg"),
    },
  ];

  const topSongs = [
    { id: 1, name: "I Wanna Be Yours", album: "AM", duration: "03:03" },
    {
      id: 2,
      name: "505",
      album: "Favourite Worst Nightmare",
      duration: "04:13",
    },
    { id: 3, name: "Do I Wanna Know?", album: "AM", duration: "04:32" },
    { id: 4, name: "No. 1 Party Anthem", album: "AM", duration: "04:03" },
    {
      id: 5,
      name: "Why'd You Only Call Me When You're High?",
      album: "AM",
      duration: "02:41",
    },
  ];

  return (
    <div className="flex flex-col items-center h-full p-8 bg-black text-white">
      <div className="flex items-center gap-8">
        <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg">
          <img
            src={artistData.image}
            alt={`Imagen de ${artistData.name}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold">{artistData.name}</h1>
          <p className="text-gray-400">{artistData.fans}</p>
        </div>
      </div>

      <div className="mt-8 w-full">
        <div className="flex gap-6 text-gray-400 border-b border-gray-700 pb-2">
          {["topCanciones", "artistasSimilares"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-1 ${
                activeTab === tab
                  ? "text-white border-b-2 border-purple-500"
                  : "hover:text-white"
              } transition`}
            >
              {tab === "topCanciones" && "Top canciones"}
              {tab === "artistasSimilares" && "Artistas similares"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 w-full">
        {activeTab === "topCanciones" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Top canciones</h2>
            <div className="flex flex-col gap-4">
              {/* Cabecera de tabla */}
              <div className="grid grid-cols-5 text-gray-400 text-sm border-b border-gray-700 pb-2">
                <span className="col-span-2">CANCIÓN</span>
                <span>ÁLBUM</span>
                <span>TIEMPO</span>
              </div>
              {/* Lista de canciones */}
              {topSongs.map((song) => (
                <div
                  key={song.id}
                  className="grid grid-cols-5 items-center text-sm hover:bg-gray-800 p-2 rounded"
                >
                  <div className="col-span-2 flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-700 rounded"></div>
                    <span>{song.name}</span>
                  </div>
                  <span>{song.album}</span>
                  <span>{song.duration}</span>
                  <button className="text-gray-400 hover:text-red-500">
                    ❤️
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "artistasSimilares" && (
          <div className="flex flex-col h-full p-6">
            <h2 className="text-2xl font-bold mb-4">Artistas similares</h2>
            <div className="grid grid-cols-4 gap-6">
              {artists.map((artist, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 text-center hover:bg-gray-800"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-700">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="mt-2 text-lg font-medium">{artist.name}</h3>
                  <p className="text-sm text-gray-400">{artist.fans}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistDetail;
