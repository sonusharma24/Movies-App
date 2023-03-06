import "./banner.css";
import Spinner from "../spinner/Spinner";
import { movieUrl } from "../../constant/constant";
import { useEffect, useState } from "react";

const Banner = () => {
  const [banner, setBanner] = useState("");

  useEffect(() => {
    const bannerFetch = async () => {
      const response = await fetch(movieUrl);
      const data = await response.json();
      setBanner(data.results[0]);
    };
    bannerFetch();
  }, []);
  return (
    <>
      {banner === "" ? (
        <Spinner />
      ) : (
        <div
          className="card card-Banner"
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${banner.backdrop_path}")`,
            backgroundPosition: "top",
            backgroundSize: "cover",
          }}
        >
          <h1 className="card-title banner-Title">{banner.original_title}</h1>
          <p className="card-text banner-Text">{banner.overview}</p>
          <div className="fade-bottom"></div>
        </div>
      )}
    </>
  );
};

export default Banner;
