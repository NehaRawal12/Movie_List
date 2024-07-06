import React from "react";
import styles from "./MoviesChild.module.css";

const MoviesChild = ({ title, release_year, genres, imdb_rating, length_in_min, poster, movie_url, onFavoriteClick }) => {
  return (
    <div className={styles.card}>
      <img src={poster} alt="poster" className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h3>Title: {title}</h3>
        <h3>Year: {release_year}</h3>
        <h3>Genres: {genres}</h3>
        <h3>IMDb Rating: {imdb_rating}</h3>
        <h3>Length: {length_in_min} mins</h3>
        <div className={styles.butdiv}>
        <a href={movie_url} target="_blank" rel="noopener noreferrer">
          <button className={styles.button1}>Read More</button>
        </a>
        <button onClick={onFavoriteClick} className={styles.button1}>
          Add Favorites
        </button>
        </div>
      </div>
    </div>
  );
};

export default MoviesChild;








