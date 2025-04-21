import React, { useState } from "react";

const playlist = [
  {
    id: 1,
    title: "alternative",
    numberSong: "20",
    releaseDate: "21/08/2020",
    image: require("../../img/505.jpeg"),
    songs: [
      { id: 1, title: "Song 1", duration: "3:20" },
      { id: 2, title: "Song 2", duration: "2:45" },
    ],
  },
  {
    id: 2,
    title: "Sad",
    numberSong: "12",
    releaseDate: "13/08/2021",
    image: "https://via.placeholder.com/100",
    songs: [
      { id: 1, title: "Song A", duration: "3:10" },
      { id: 2, title: "Song B", duration: "4:05" },
    ],
  },
  {
    id: 3,
    title: "favorite rock",
    numberSong: "30",
    releaseDate: "03/11/2018",
    explicit: true,
    image: "https://via.placeholder.com/100",
    songs: [
      { id: 1, title: "Rock Song 1", duration: "5:20" },
      { id: 2, title: "Rock Song 2", duration: "4:50" },
    ],
  },
];

const Playlists = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  return (
    <div className="p-4 bg-black text-white h-full overflow-y-auto">
      {selectedPlaylist ? (
        <div>
          <div className="flex items-center gap-4">
            <img
              src={selectedPlaylist.image}
              alt={selectedPlaylist.title}
              className="w-32 h-32 rounded-md"
            />
            <div>
              <h2 className="text-2xl font-semibold">
                {selectedPlaylist.title}
              </h2>
              <p className="text-sm text-gray-400">
                {selectedPlaylist.numberSong} canciones
              </p>
              <p className="text-sm text-gray-500">
                Creado el {selectedPlaylist.releaseDate}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Canciones</h3>
            <ul className="flex flex-col gap-2">
              {selectedPlaylist.songs.map((song) => (
                <li
                  key={song.id}
                  className="flex justify-between text-sm py-1 border-b border-gray-700 hover:bg-gray-800"
                >
                  <span>{song.title}</span>
                  <span>{song.duration}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Playlists</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {playlist.map((playlistItem) => (
              <div
                key={playlistItem.id}
                className="bg-black p-2 rounded-lg hover:bg-gray-700 transition cursor-pointer"
                onClick={() => handlePlaylistClick(playlistItem)}
              >
                <img
                  src={playlistItem.image}
                  alt={playlistItem.title}
                  className="w-20 h-20 rounded-md mb-2 mx-auto"
                />
                <h3 className="text-sm font-medium text-center">
                  {playlistItem.title}
                </h3>
                <p className="text-xs text-gray-400 text-center">
                  Canciones {playlistItem.numberSong}
                </p>
                <p className="text-xs text-gray-500 text-center">
                  Creado el {playlistItem.releaseDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Playlists;
