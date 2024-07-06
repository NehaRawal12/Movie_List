import React, { useState } from "react";
import MoviesChild from "./MoviesChild";

const MovieList = ({ movies }) => {
  const [favorites, setFavorites] = useState([]);

  const handleFavorite = (movie) => {
    setFavorites([...favorites, movie]);
  };

  return (
    <div>
      {movies.map((movie) => (
        <MoviesChild
          key={movie.id}
          title={movie.title}
          release_year={movie.release_year}
          genres={movie.genres}
          imdb_rating={movie.imdb_rating}
          length_in_min={movie.length_in_min}
          poster={movie.poster}
          movie_url={movie.movie_url}
          onFavorite={() => handleFavorite(movie)}
        />
      ))}
      <h2>Favorites</h2>
      <ul>
        {favorites.map((favorite, index) => (
          <li key={index}>{favorite.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
