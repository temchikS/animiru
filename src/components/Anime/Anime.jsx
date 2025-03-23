import jp from "../images/Japan.jpg";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Anime.css";
import RelatedAnime from "./RelatedAnime";
import VideoPlayer from "./VideoPlayer";
function Anime() {
  const { title } = useParams();
  const [seasonData, setSeasonData] = useState({});
  const [relatedAnime, setRelatedAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`https://localhost:7197/api/get_season_by_title?title=${title}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка загрузки");
        }
        return response.json();
      })
      .then((data) => {
        setSeasonData(data);
        setIsLoading(false);
        if (data.episodes?.length > 0) {
          setSelectedEpisode(data.episodes[0]);
        }

        if (data.id) {
          fetch(
            `https://localhost:7197/api/get_seasons_by_anime_id?animeId=${data.animeId}`
          )
            .then((response) => {
              if (response.status === 204) {
                console.log("Сезон только один, данные не возвращены.");
                setRelatedAnime([]);
                return [];
              } else if (!response.ok) {
                throw new Error("Ошибка загрузки");
              }
              return response.json();
            })
            .then((seasonsData) => {
              setRelatedAnime(seasonsData);
              console.log(seasonsData);
            })
            .catch((error) => {
              setError(error.message);
            });
        }
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [title]);

  if (isLoading) {
    return <h2>Загрузка...</h2>;
  }
  if (error) {
    return <h2 style={{ color: "red" }}>Ошибка загрузки: {error}</h2>;
  }

  return (
    <div className="anime page">
      <div className="about-anime">
        <div className="about">
          <img
            className="big-cover"
            src={`https://localhost:7197/${
              seasonData.coverImage || "default.jpg"
            }`}
            alt="Обложка"
          />
          <div className="about light-bg">
            <div className="country">
              <img
                width={16}
                style={{ borderRadius: "5px" }}
                src={jp}
                alt="country"
              />
              {seasonData.country}
            </div>
            <p>
              Эпизодов
              <br />
              {seasonData.episodes?.length ?? 0}
            </p>
            <p>
              Статус
              <br />
              {seasonData.status}
            </p>
            <p>
              Автор
              <br />
              {seasonData.author}
            </p>
            <p>
              Студия
              <br />
              {seasonData.studio}
            </p>
          </div>
        </div>
        <div className="about about-right light-bg">
          <h1>{seasonData.title || "Нет данных"}</h1>
          <h2 style={{ opacity: "0.5" }}>
            {seasonData.originalTitle?.replaceAll("-", " ")}
          </h2>
          <p>{seasonData.description}</p>
          <div className="genres">
            {seasonData.genres?.map((genre) => (
              <span className="genre" key={genre.id}>
                {genre.name}{" "}
              </span>
            ))}
          </div>
          <RelatedAnime relatedAnime={relatedAnime} />
        </div>
      </div>
      <VideoPlayer
        selectedEpisode={selectedEpisode}
        setSelectedEpisode={setSelectedEpisode}
        seasonData={seasonData}
      />
    </div>
  );
}

export default Anime;
