import React, { useEffect, useState } from "react";
import "./Home.css";
import HomeAnimeList from "./HomeAnimeList";
function Home() {
  return (
    <div className="home page">
      <div className="last-anime-list list light-bg">
        <h2>Новые серии</h2>
        <HomeAnimeList />
      </div>
      <div className="list light-bg">
        <HomeAnimeList filters={true} />
      </div>
    </div>
  );
}

export default Home;
