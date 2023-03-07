import React, { useCallback, useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import "./movies.css";
import { movieUrl } from "../../constant/constant";
import { imageUrl } from "../../constant/constant";

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
      favourites: [],
    };
  });

  // get movies from Tmdb api
  const getMovies = useCallback(async () => {
    setState((prev) => {
      return { ...prev, loader: true };
    });
    try {
      const response = await fetch(`${movieUrl}&page=${state.currPage}`);
      // when response.ok is false return
      if (!response.ok) {
        return;
      }
      // when getting response from server set loader value false
      setState((prev) => {
        return { ...prev, loader: false };
      });

      const moviesArr = await response.json();

      setState((prev) => {
        return { ...prev, movies: [...moviesArr.results] };
      });

      // console.log(response);
      // after getting response set movies state
    } catch (error) {
      // console.log(error);

      // when getting error from server set error true
      setState((prev) => {
        return { ...prev, error: true, loader: false };
      });
    }
  }, [state.currPage]);

  // useeffect
  useEffect(() => {
    getMovies();
  }, [getMovies, state.currPage]);

  // next movie button
  const nextMoviesHandler = () => {
    // create temp arr for update value of pagination
    let tempArr = [];
    for (let i = 1; i <= state.pagination.length + 1; i++) {
      tempArr.push(i);
    }
    // update pagination and current page value very time next btn click
    setState((prev) => {
      return {
        ...prev,
        pagination: [...tempArr],
        currPage: prev.currPage + 1,
      };
    });
  };
  const previousMoviesHandler = () => {
    if (state.currPage !== 1) {
      setState((prev) => {
        return { ...prev, currPage: prev.currPage - 1 };
      });
    }
  };

  const currentNumber = (value) => {
    if (value !== state.currPage) {
      setState((prev) => {
        return { ...prev, currPage: value };
      });
    }
  };

  // save movies in localstorage
  const saveMoviesHandler = (movieObj) => {
    // get old movies data from localstorage
    let oldData = JSON.parse(localStorage.getItem("movies") || "[]");

    if (state.favourites.includes(movieObj.id)) {
      oldData = oldData.filter((movie) => movie.id !== movieObj.id);
    } else {
      oldData.push(movieObj);
    }
    // send movies data in local storage
    localStorage.setItem("movies", JSON.stringify(oldData));

    // save movies id into favourites state
    const tempData = oldData.map((movie) => movie.id);
    setState((prev) => {
      return { ...prev, favourites: [...tempData] };
    });
    console.log(oldData);
  };
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
                      onClick={() => saveMoviesHandler(movieobj)}
                    >
                      {state.favourites.includes(movieobj.id)
                        ? "Remove from Favorites"
                        : "Add to Favorites"}
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
                  className="page-link pointer"
                  onClick={previousMoviesHandler}
                >
                  Previous
                </a>
              </li>
              {state.pagination.map((item) => {
                return (
                  <li key={item} className="page-item">
                    <a
                      className="page-link pointer"
                      onClick={() => currentNumber(item)}
                    >
                      {item}
                    </a>
                  </li>
                );
              })}
              <li className="page-item">
                <a className="page-link pointer" onClick={nextMoviesHandler}>
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
