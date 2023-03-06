import React, { useState } from "react";
import "./favourites.css";
import { movies } from "../../getData";
import { genreids } from "../../constant/constant";
import { imageUrl } from "../../constant/constant";

const Favorites = () => {
  const [state, setState] = useState({
    genre: [],
    currGenre: "All Genre",
  });
  const movie = movies.results;
  let tempArr = [];
  movie.forEach((movieObj) => {
    if (!tempArr.includes(genreids[movieObj.genre_ids[0]])) {
      tempArr.push(genreids[movieObj.genre_ids[0]]);
    }
  });
  tempArr.unshift("All Genre");
  console.log(tempArr);
  return (
    <>
      <div className="favourites-section">
        <div className="row">
          {/* lists */}
          <div className="col-3">
            <ul className="list-group favourites-Genres ">
              <li className="list-group-item">All Genres</li>
              <li className="list-group-item">Actions</li>
              <li className="list-group-item">Actions</li>
              <li className="list-group-item">Actions</li>
              <li className="list-group-item">Actions</li>
            </ul>
          </div>
          <div className="col-9 favourites-table">
            <div className="row">
              <input type="text" className="input-group-text col" />
              <input type="number" className="input-group-text col" />
            </div>
            {/* table  */}
            <div className="row">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Popularity</th>
                    <th scope="col">Rating</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {movie.map((movieObj) => (
                    <tr>
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
                        <button type="button" class="btn btn-danger">
                          Danger
                        </button>
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#">
                    Previous
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorites;
