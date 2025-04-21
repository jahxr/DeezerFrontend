import React from "react";
import { useNavigate } from "react-router-dom";

const artists = [
  {
    name: "Arctic Monkeys",
    fans: "2434 fans",
    image: require("../../img/images.jpeg"),
  },
  { name: "5050", fans: "1127 fans", image: require("../../img/images.jpeg") },
  {
    name: "5050 Flow Malandro",
    fans: "2438 fans",
    image: require("../../img/images.jpeg"),
  },
  {
    name: "505 Games",
    fans: "70 fans",
    image: require("../../img/images.jpeg"),
  },
  {
    name: "5051Kartell",
    fans: "372 fans",
    image: require("../../img/images.jpeg"),
  },
];

const Artists = () => {
  const navigate = useNavigate();

  const handleArtistClick = (artistName) => {
    navigate(`/app/artist/${artistName}`);
  };

  return (
    <div className="flex flex-col overflow-y-scroll h-full p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Artistas</h2>
      <div className="grid grid-cols-5 gap-6">
        {artists.map((artist, index) => (
          <div
            key={index}
            className="group flex flex-col items-center p-4 bg-transparent rounded-lg cursor-pointer hover:bg-purple-900 transition duration-200"
            onClick={() => handleArtistClick(artist.name)}
          >
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-transparent group-hover:border-purple-500 transition duration-200">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="mt-3 text-white text-sm font-medium group-hover:text-purple-500 transition duration-200">
              {artist.name}
            </h3>
            <p className="text-xs text-gray-400">{artist.fans}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artists;
