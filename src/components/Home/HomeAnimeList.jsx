import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomeAnimeList({ filters }) {
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [lastUpdatedSeasons, setLastUpdatedSeasons] = useState([]);

  useEffect(() => {
    fetch(`https://localhost:7197/api/get_seasons`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setSeasons(data);
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
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка загрузки данных:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    if (filters) {
      fetch("https://localhost:7197/api/get_genres")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setGenres(data);
        })
        .catch((error) => {
          console.error("Ошибка загрузки жанров:", error);
        });
    }
  }, []);
  if (loading) return <p>Загрузка...</p>;

  if (filters) {
    return (
      <div className="popular-anime-list__filters">
        <div className="filters">
          <h3>Жанры</h3>
          <ul className="genre-list">
            {genres.map((genre) => (
              <li key={genre.id}>
                <Link className="unstyled-link">{genre.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <ul className="anime-list-container__filters scrollbar-none">
          {seasons.map((season) => (
            <Link
              className="unstyled-link"
              to={`/anime/title/${season.originalTitle}`}
              key={season.id}
            >
              <li className="anime-card hover-scale">
                <img
                  src={`https://localhost:7197${season.coverImage}`}
                  alt={season.title}
                  style={{
                    width: "100%",
                    aspectRatio: "9 / 12",
                    borderRadius: "8px",
                  }}
                />
                <p>{season.title}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <ul className="anime-list-container scrollbar-none">
      {lastUpdatedSeasons.map((season) => (
        <Link
          className="unstyled-link"
          to={`/anime/title/${season.originalTitle}`}
          key={season.id}
        >
          <li className="anime-card hover-scale">
            <img
              src={`https://localhost:7197${season.coverImage}`}
              alt={season.title}
              style={{
                width: "173px",
                height: "246px",
                borderRadius: "8px",
              }}
            />
            <p className="truncate-text">{season.title}</p>
          </li>
        </Link>
      ))}
    </ul>
  );
}
export default HomeAnimeList;
