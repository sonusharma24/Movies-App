import React, { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import "./movies.css";
import { movieUrl } from "../../common/api/api";

const Movies = () => {
  // initial state
  const [state, setState] = useState(() => {
    return {
      hover: "",
      pagination: [1],
      movies: [],
      currPage: 1,
      loader: true,
      error: false,
    };
  });
  const imageUrl = "https://image.tmdb.org/t/p/original/";

  // get movies from Tmdb api
  const getMovies = async () => {
    setState((prev) => {
      return { ...prev, loader: true };
    });
    try {
      const response = await fetch(`${movieUrl}&page=${state.currPage}`);
      console.log(response);
      // when response.ok is false return
      if (!response.ok) {
        return;
      }
      // when getting response from server set loader value false
      setState((prev) => {
        return { ...prev, loader: false };
      });
      const moviesArr = await response.json();

      // console.log(response);

      // after getting response set movies state
      setState((prev) => {
        return { ...prev, movies: moviesArr.results };
      });
    } catch (error) {
      // console.log(error);
      // when getting error from server set error true
      setState((prev) => {
        return { ...prev, error: true, loader: false };
      });
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  // next movie button
  const nextMoviesHandler = () => {};
  const previousMoviesHandler = () => {};

  return (
    <>
      <main>
        <h3 className="text-center">
          <strong>Trending</strong>
        </h3>
        {state.loader && <Spinner />}
        {state.error && (
          <div className="text-danger text-center">"something went wrong "</div>
        )}

        {!state.error && !state.loader && (
          <div className="movies-list">
            {state.movies.map((movieobj) => {
              return (
                <div
                  key={movieobj.id}
                  className=" movies-card"
                  onMouseEnter={() =>
                    setState((prev) => {
                      return { ...prev, hover: movieobj.id };
                    })
                  }
                  onMouseLeave={() =>
                    setState((prev) => {
                      return { ...prev, hover: "" };
                    })
                  }
                >
                  <div className="card-top">
                    <img
                      src={`${imageUrl}${movieobj.backdrop_path}`}
                      className=" movie-img"
                      alt={movieobj.title}
                    />
                  </div>
                  <div className="card-bottom">
                    <h5
                      className={
                        movieobj.title.length > 18 ? "long-font" : "movie-title"
                      }
                    >
                      {movieobj.title}
                    </h5>
                  </div>

                  {movieobj.id === state.hover && (
                    <button
                      type="button"
                      className="btn btn-primary favorites-btn"
                    >
                      {" "}
                      Add to Favorites
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* pagination */}
        <div className="pagination-card">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a
                  className="page-link"
                  href="#/"
                  onClick={previousMoviesHandler}
                >
                  Previous
                </a>
              </li>
              {state.pagination.map((item) => {
                return (
                  <li key={item} className="page-item">
                    <a className="page-link" href="#/">
                      {item}
                    </a>
                  </li>
                );
              })}
              <li className="page-item">
                <a className="page-link" href="#/" onClick={nextMoviesHandler}>
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </main>
    </>
  );
};

export default Movies;
