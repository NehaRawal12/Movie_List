import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import MoviesPage from './pages/moviesPage/MoviesPage';
import FavoritesPage from './components/FavoritesList';
import moviesData from './assets/movies.json';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';

const App = () => {
  const userData = localStorage.getItem('userData');
  const [favorites, setFavorites] = useState([]);

  const handleFavoriteClick = (movie) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some(fav => fav.movie_url === movie.movie_url)) {
        return [...prevFavorites, movie];
      }
      return prevFavorites;
    });
  };

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={userData ? <MoviesPage movieData={moviesData} onFavoriteClick={handleFavoriteClick} /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/favorites" element={<FavoritesPage favorites={favorites} />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={1000} pauseOnHover={false} />
      </div>
    </BrowserRouter>
  );
};

export default App;
