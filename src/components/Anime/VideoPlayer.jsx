import Hls from "hls.js";
import { useEffect } from "react";
function VideoPlayer({ selectedEpisode, seasonData, setSelectedEpisode }) {
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
  return (
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
  );
}
export default VideoPlayer;
