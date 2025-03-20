import Hls from "hls.js";
import jp from "../images/Japan.jpg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Anime.css";

function Anime() {
  const { title } = useParams();
  const [seasonData, setSeasonData] = useState({});
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
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [title]);

  // useEffect(() => {
  //   fetch(
  //     `https://localhost:7197/api/get_seasons_by_anime_id?animeId=${seasonData.id}`
  //   )
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Ошибка загрузки");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //     });
  // }, [seasonData]);
  useEffect(() => {
    if (selectedEpisode && selectedEpisode.videoUrl) {
      const video = document.getElementById("video-player");

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(`https://cache.libria.fun${selectedEpisode.videoUrl}`);
        hls.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = `https://cache.libria.fun${selectedEpisode.videoUrl}`;
      }
    }
  }, [selectedEpisode]);
  if (isLoading) {
    return <h2>Загрузка...</h2>;
  }
  if (error) {
    return <h2 style={{ color: "red" }}>Ошибка загрузки: {error}</h2>;
  }

  return (
    <div className="anime page">
      <img
        className="big-cover"
        src={`https://localhost:7197/${seasonData.coverImage || "default.jpg"}`}
        alt="Обложка"
      />
      <div className="about-anime">
        <h1>{seasonData.title || "Нет данных"}</h1>
        <h2 style={{ opacity: "0.5" }}>
          {seasonData.originalTitle?.replaceAll("-", " ") || "Нет названия"}
        </h2>
        <div className="country">
          <img
            width={16}
            style={{ borderRadius: "5px" }}
            src={jp}
            alt="country"
          />
          {seasonData.country}
        </div>
        <p>Эпизодов: {seasonData.episodes?.length ?? 0}</p>
        <p>Статус: {seasonData.status}</p>
        <p>Автор: {seasonData.author}</p>
        <p>Студия: {seasonData.studio}</p>
        <p>{seasonData.description}</p>
      </div>

      <div className="player-container">
        <div className="player">
          <select
            className="episode-selector"
            onChange={(e) => {
              const episodeId = Number(e.target.value);
              const episode = seasonData.episodes.find(
                (ep) => ep.id === episodeId
              );
              setSelectedEpisode(episode);
            }}
            value={selectedEpisode?.id || ""}
          >
            {seasonData.episodes?.map((ep) => (
              <option key={ep.id} value={ep.id}>
                Серия {ep.episodeNumber}
              </option>
            ))}
          </select>
          {selectedEpisode && <video id="video-player" controls></video>}
        </div>
      </div>
    </div>
  );
}

export default Anime;
