import React, { useEffect, useState } from "react";
import "./Home.css";
import HomeAnimeList from "./HomeAnimeList";
function Home() {
  const [seasons, setSeasons] = useState([]);
  const [lastUpdatedSeasons, setLastUpdatedSeasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("https://localhost:7197/api/get_seasons")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setSeasons(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка загрузки данных:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    fetch("https://localhost:7197/api/get_updated_seasons")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setLastUpdatedSeasons(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка загрузки данных:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);
  if (loading) return <p>Загрузка...</p>;
  return (
    <div className="home page">
      <div className="last-anime-list list">
        <h2>Новые серии</h2>
        <HomeAnimeList seasons={lastUpdatedSeasons} />
      </div>
      <div className="list">
        <HomeAnimeList seasons={seasons} filters={true} />
      </div>
    </div>
  );
}

export default Home;
