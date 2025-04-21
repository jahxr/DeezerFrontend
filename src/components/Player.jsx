import React from "react";

import Cancion from "./playercomps/Cancion";
import Reproductor from "./playercomps/Reproductor";
import Config from "./playercomps/Config";

const Player = () => {


  return (
    <footer style={styles.player}>
      <Cancion></Cancion>
      <Reproductor></Reproductor>
      <Config></Config>

    </footer>
  );
};

const styles = {
  player: {
    background: "#1e1e1e",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    position: "fixed",
    bottom: 0,
    width: "100%",
    height: "68px",
    boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.5)",
  },
};

export default Player;
