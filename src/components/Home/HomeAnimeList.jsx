import { Link } from "react-router-dom";

function HomeAnimeList({ seasons, filters }) {
  if (filters === true) {
    return (
      <div className="popular-anime-list__filters">
        <div className="filters">
          <h3>Жанры</h3>
          <ul className="genre-list">
            <li>Комедия</li>
            <li>Хоррор</li>
            <li>Сёнэн</li>
            <li>Фэнтези</li>
            <li>Спорт</li>
            <li>Детектив</li>
            <li>Романтика</li>
            <li>Повседневность</li>
            <li>Драма</li>
            <li>Мистика</li>
            <li>Исекай</li>
          </ul>
        </div>
        <ul className="anime-list-container__filters">
          {seasons.map((season) => (
            <Link
              className="unstyled-link"
              to={`/anime/title/${season.originalTitle}`}
              key={season.id}
            >
              <li className="anime-card">
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
    <ul className="anime-list-container">
      {seasons.map((season) => (
        <Link
          className="unstyled-link"
          to={`/anime/title/${season.originalTitle}`}
          key={season.id}
        >
          <li className="anime-card">
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
