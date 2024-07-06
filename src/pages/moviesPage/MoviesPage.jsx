import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import MoviesChild from '../../components/ChildComponets/MoviesChild';
import styles from './MoviesPage.module.css';

const MoviesPage = ({ movieData, onFavoriteClick }) => {
  movieData = movieData.sort((a, b) => parseFloat(b.imdb_rating) - parseFloat(a.imdb_rating));

  const [searchResults, setSearchResults] = useState(movieData);
  const [startIndex, setStartIndex] = useState(0);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [lengthRange, setLengthRange] = useState('');

  const moviesPerPage = 12;

  useEffect(() => {
    filterMovies();
  }, [title, year, genre, rating, lengthRange]);

  const handleSearch = (e) => {
    setTitle(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleLengthRangeChange = (e) => {
    setLengthRange(e.target.value);
  };

  const filterMovies = () => {
    let results = movieData.slice(); // Create a copy to avoid mutating original data
    results = results.sort((a, b) => parseFloat(a.imdb_rating) - parseFloat(b.imdb_rating));

    if (title) {
      results = results.filter((movie) => {
        const movieTitle = movie.title.toString();
        const titleWords = movieTitle.toLowerCase();
        const searchWords = title.toLowerCase();
        return titleWords.includes(searchWords);
      });
    }

    if (year) {
      results = results.filter((movie) => movie.release_year == year);
    }

    if (genre) {
      results = results.filter((movie) =>
        movie.genres.toLowerCase().includes(genre.toLowerCase())
      );
    }

    if (rating) {
      const ratingValue = parseFloat(rating);
      results = results.filter((movie) => movie.imdb_rating >= ratingValue && movie.imdb_rating < ratingValue + 1);
    }

    if (lengthRange) {
      const [minlength, maxlength] = lengthRange.split("-");
      results = results.filter((movie) =>
        movie.length_in_min >= minlength && movie.length_in_min <= maxlength
      );
    }

    setSearchResults(results);
    setStartIndex(0);
  };

  const handleNext = () => {
    setStartIndex((startIndex) => startIndex + moviesPerPage);
  };

  const handlePrevious = () => {
    setStartIndex((startIndex) => Math.max(startIndex - moviesPerPage, 0));
  };

  const currentPage = Math.floor(startIndex / moviesPerPage);
  const pageCount = Math.ceil(searchResults?.length / moviesPerPage);

  return (
    <>
      <div className={styles.filtersContainer}>
        <input
          type="text"
          placeholder="Search a movie..."
          value={title}
          onChange={handleSearch}
          className={styles.searchInput}
        />
        <input
          type="number"
          placeholder="Release Year"
          value={year}
          onChange={handleYearChange}
          className={styles.filterInput}
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={handleGenreChange}
          className={styles.filterInput}
        />
        <select
          value={rating}
          onChange={handleRatingChange}
          className={styles.filterInput}
        >
          <option value="">IMDb Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <select
          value={lengthRange}
          onChange={handleLengthRangeChange}
          className={styles.filterInput}
        >
          <option value="">Length (min)</option>
          <option value="1-30">1-30</option>
          <option value="31-60">31-60</option>
          <option value="61-90">61-90</option>
          <option value="91-120">90-120</option>
          <option value="121-150">121-150</option>
        </select>
        <Link to="/favorites">
          <button className={styles.favoritesButton}>View Favorites</button>
        </Link>
      </div>
      <div className={styles.moviesParent}>
        {searchResults
          ?.slice(startIndex, startIndex + moviesPerPage)
          .map((data) => (
            <MoviesChild
              key={data.movie_url}
              {...data}
              onFavoriteClick={() => onFavoriteClick(data)}
            />
          ))}
      </div>
      <div className={styles.pagination}>
        <button
          className={styles.paginationArrow}
          onClick={handlePrevious}
          disabled={startIndex === 0}
        >
          <ChevronLeft />
        </button>
        <div className={styles.pageCount}>
          {currentPage + 1} / {pageCount}
        </div>
        <button
          className={styles.paginationArrow}
          onClick={handleNext}
          disabled={startIndex + moviesPerPage >= searchResults?.length}
        >
          <ChevronRight />
        </button>
      </div>
    </>
  );
};

export default MoviesPage;
