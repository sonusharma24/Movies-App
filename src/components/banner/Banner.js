import { movies } from "../movieData";
import "./banner.css";
import Spinner from "../spinner/Spinner";

const Banner = () => {
  const movie = movies.results[0];
  const baseUrl = "https://image.tmdb.org/t/p/original/";
  return (
    <>
      {movie === "" ? (
        <Spinner />
      ) : (
        <div
          className="card card-Banner"
          style={{
            backgroundImage: `url("${baseUrl}${movie?.backdrop_path}")`,
            backgroundPosition: "top",
            backgroundSize: "cover",
          }}
        >
          <h1 className="card-title banner-Title">{movie.original_title}</h1>
          <p className="card-text banner-Text">{movie.overview}</p>
          <div className="fade-bottom"></div>
        </div>
      )}
    </>
  );
};

export default Banner;
