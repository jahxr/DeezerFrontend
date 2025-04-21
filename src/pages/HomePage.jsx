import React from "react";
import CircleCategory from "../components/appcomps/CircleCategory";
import ContinueStreaming from "../components/appcomps/ContinueStreaming";
import Discover from "../components/appcomps/Discover";
import BeyondStreaming from "../components/appcomps/BeyondStreaming";

function HomePage({ onClick }) {

  return (
    <div onClick={onClick}>
      <CircleCategory />
      <ContinueStreaming />
      <Discover />
      <BeyondStreaming />
    </div>
  );
}

export default HomePage;