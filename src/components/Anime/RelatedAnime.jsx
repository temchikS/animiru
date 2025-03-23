import { Link } from "react-router-dom";
function RelatedAnime({ relatedAnime }) {
  return (
    <div className="related-anime">
      {relatedAnime?.length > 0 && (
        <>
          <h3>Все сезоны</h3>
          <div className="related-anime-list scrollbar-none">
            {relatedAnime.map((season) => (
              <Link
                className="unstyled-link"
                to={`/anime/title/${season.originalTitle}`}
                key={season.id}
              >
                <li className="related__anime-card">
                  <img
                    style={{
                      borderRadius: "10px",
                    }}
                    src={`https://localhost:7197${season.coverImage}`}
                    alt={season.title}
                  />
                  <div className="related__anime-card-about">
                    <p>{season.title}</p>
                    <p>{season.status}</p>
                  </div>
                </li>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
export default RelatedAnime;
