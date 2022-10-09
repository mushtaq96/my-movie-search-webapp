import React, { useState } from "react";
import MovieCard from "./movieCard.js";

function SearchMovies() {
  //states
  const [query, setQuery] = useState("");
  //movies state and update
  const [movies, setMovies] = useState([]);
  const [errorText, setErrorText] = useState(null);

  const SearchMovies = async (e) => {
    e.preventDefault();
    console.log("submitting");

    const myApiKey = "624dac08ec2eb76d49a69bc057e6f9e1";
    if(query.trim().length !== 0){
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${myApiKey}&language=en-US&query=${query}&page=1&include_adult=false`;
    
      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.results);
        setMovies(data.results);
        if((movies !== undefined && movies !== null) && Object.keys(movies).length == 0){
          setErrorText("Invalid Input, please try again")
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <>
      <form className="form" onSubmit={SearchMovies}>
        <label className="label" htmlFor="query">
          Movie name
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="ex - Lord of the rings"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
        <button type="submit" className="button">
          Search
        </button>
      </form>
      <div className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>
        {errorText !== null ? <p>{errorText}</p>: null}

    </>
  );
}

export default SearchMovies;
