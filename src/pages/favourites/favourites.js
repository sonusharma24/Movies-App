import React, { useCallback, useEffect, useState } from "react";
import "./favourites.css";
import { genreids } from "../../constant/constant";
import { imageUrl } from "../../constant/constant";

const Favorites = () => {
  const [state, setState] = useState(() => {
    return {
      genre: [],
      currGenre: "All Genre",
      movies: [],
      filterMovies: [],
      currSearch: "",
      limit: 5,
      currPage: 1,
      allPages: [],
    };
  });

  const filterFunction = useCallback(() => {
    // filter based on search
    // create empty filter arr
    let filterArr = [];
    if (state.currSearch === "") {
      filterArr = state.movies;
      setState((prev) => {
        return { ...prev, filterMovies: [...filterArr] };
      });
    } else {
      filterArr = state.movies.filter((movieObj) => {
        const title = movieObj.original_title.toLowerCase();
        return title.includes(state.currSearch.toLowerCase());
      });
      setState((prev) => {
        return { ...prev, filterMovies: [...filterArr] };
      });
    }

    //  filter based on value of genre
    // if currGenre not equal to all genre filter movies based on genre and save data in filterArr
    if (state.currGenre !== "All Genre") {
      filterArr = state.movies.filter(
        (movieObj) => genreids[movieObj.genre_ids[0]] === state.currGenre
      );
      setState((prev) => {
        return { ...prev, filterGenre: [...filterArr] };
      });
    }

    // pagination based on limit
    const pages = Math.ceil(filterArr.length / state.limit);
    let pagesArr = [];
    for (let i = 1; i <= pages; i++) {
      pagesArr.push(i);
    }
    setState((prev) => {
      return { ...prev, allPages: [...pagesArr] };
    });
    const si = (state.currPage - 1) * state.limit;
    const lastIndex = si + state.limit;
    filterArr = filterArr.slice(si, lastIndex);
  }, [
    state.movies,
    state.currGenre,
    state.currSearch,
    state.limit,
    state.currPage,
  ]);

  useEffect(() => {
    filterFunction();
  }, [filterFunction]);

  useEffect(() => {
    // get data from local storage ans store in data
    const data = JSON.parse(localStorage.getItem("movies"));
    if (!data) {
      return;
    }

    let tempArr = [];
    data?.forEach((movieObj) => {
      if (!tempArr.includes(genreids[movieObj.genre_ids[0]])) {
        tempArr.push(genreids[movieObj.genre_ids[0]]);
      }
    });
    tempArr.unshift("All Genre");
    setState((prev) => {
      return { ...prev, genre: [...tempArr], movies: [...data] };
    });
  }, []);

  const genreChangeHandler = (genre) => {
    setState((prev) => {
      return { ...prev, currGenre: genre };
    });
  };

  // sort based on movie popularity
  const sortPopularityDes = () => {
    let tempArr = state.movies;
    tempArr.sort((objA, objB) => {
      return objB.popularity - objA.popularity;
    });
    setState((prev) => {
      return { ...prev, movies: [...tempArr] };
    });
  };
  const sortPopularityAscen = () => {
    let tempArr = state.movies;
    tempArr.sort((objA, objB) => {
      return objA.popularity - objB.popularity;
    });
    setState((prev) => {
      return { ...prev, movies: [...tempArr] };
    });
  };

  // sort based on rating
  const sortRatingDesc = () => {
    let tempArr = state.movies;
    tempArr.sort((ratingA, ratingB) => {
      return ratingB.vote_average - ratingA.vote_average;
    });

    setState((prev) => {
      return { ...prev, movies: [...tempArr] };
    });
  };

  const sortRatingAscen = () => {
    let tempArr = state.movies;
    tempArr.sort((ratingA, ratingB) => {
      return ratingA.vote_average - ratingB.vote_average;
    });

    setState((prev) => {
      return { ...prev, movies: [...tempArr] };
    });
  };

  // handle pages changes
  const handlePageChange = (page) => {
    setState((prev) => {
      return { ...prev, currPage: page };
    });
  };

  // delete data when someone click this button
  const deleteHandler = (id) => {
    let tempDel = [];
    tempDel = state.movies.filter((movieObj) => movieObj.id !== id);
    setState((prev) => {
      return { ...prev, movies: [...tempDel] };
    });
    localStorage.setItem("movies", JSON.stringify(tempDel));
  };
  return (
    <>
      <div className="favourites-section">
        <div className="row">
          {/* lists */}
          <div className="col-lg-3 col-sm-12">
            <ul className="list-group favourites-Genres ">
              {state.genre?.map((genre) =>
                state.currGenre === genre ? (
                  <li
                    key={genre}
                    className="list-group-item"
                    style={{
                      background: "#228B22",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {genre}
                  </li>
                ) : (
                  <li
                    className="list-group-item"
                    style={{
                      background: "white",
                      color: "#228B22",
                      fontWeight: "bold",
                    }}
                    onClick={() => genreChangeHandler(genre)}
                  >
                    {genre}
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="col-lg-9 favourites-table col-sm-12">
            <div className="row">
              <input
                placeholder="search"
                type="text"
                className="input-group-text col"
                value={state.currSearch}
                onChange={(e) =>
                  setState((prev) => {
                    return { ...prev, currSearch: e.target.value };
                  })
                }
              />
              <input
                value={state.limit}
                type="number"
                className="input-group-text col"
                placeholder="row count"
                onChange={(e) =>
                  setState((prev) => {
                    return { ...prev, limit: e.target.value };
                  })
                }
              />
            </div>
            {/* table  */}
            <div className="row">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col">
                      <i
                        className="fa-solid fa-sort-up"
                        onClick={sortPopularityDes}
                      ></i>
                      Popularity
                      <i
                        className="fa-solid fa-sort-down"
                        onClick={sortPopularityAscen}
                      ></i>
                    </th>
                    <th scope="col">
                      <i
                        className="fa-solid fa-sort-up"
                        onClick={sortRatingDesc}
                      ></i>
                      Rating
                      <i
                        className="fa-solid fa-sort-down"
                        onClick={sortRatingAscen}
                      ></i>
                    </th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {state.filterMovies?.map((movieObj) => (
                    <tr key={movieObj.id}>
                      <td>
                        {" "}
                        <img
                          style={{ width: "6rem", margin: "1rem" }}
                          src={`${imageUrl}${movieObj.backdrop_path}`}
                          alt={movieObj.title}
                        />
                        {movieObj.title}
                      </td>
                      <td>{genreids[movieObj.genre_ids[0]]}</td>
                      <td>{movieObj.popularity}</td>
                      <td>{movieObj.vote_average}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => deleteHandler(movieObj.id)}
                        >
                          Danger
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                {state.allPages.map((page) => (
                  <li className="page-item page-pointer">
                    <a
                      className="page-link"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorites;
