import axios from "axios";
import React, { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState();
  const [searchTerm, setSearchTerm] = useState("panda");

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=8df60ba5&s=${searchTerm}`
      );
      console.log(res.data.Search);
      setData(res.data.Search);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  const SearchValue = (value) => {
    setSearchTerm(value);
  };

  return (
    <div className="container">
      <h1>SEARCH CINEMA</h1>
      <hr />
      <input
        type="text"
        className="input"
        placeholder="search film"
        value={searchTerm}
        onChange={(e) => SearchValue(e.target.value)}
      />
      <div className="content">
        {data ? (
          data.map((movie) => {
            return (
              <div key={movie.imdbID} className="movie-card">
                <img src={movie.Poster} alt={movie.Title} />
                <h2>{movie.Title}</h2>
                <p>{movie.Year}</p>
              </div>
            );
          })
        ) : (
          <p>No movies found...</p>
        )}
      </div>
    </div>
  );
}
