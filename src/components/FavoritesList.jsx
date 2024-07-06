
import React from "react";
import MoviesChild from "../components/ChildComponets/MoviesChild";
import styles from "./FavoritesList.module.css";

const FavoritesPage = ({ favorites }) => {
  return (
    <div className={styles.favoritesPage}>
      <h2  className={styles.feaheading}>Favorites</h2>
      <div className={styles.moviesParent}>
        {favorites.length > 0 ? (
          favorites.map((favorite) => (
            <MoviesChild key={favorite.movie_url} {...favorite} />
          ))
        ) : (
          <p>No favorites yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;

