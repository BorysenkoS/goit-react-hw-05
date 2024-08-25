import css from "./App.module.css";
import clsx from "clsx";

import { fetchTrendingMovies } from "./pages/services/api";

import { useEffect, useState } from "react";
import { NavLink, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import MovieCast from "./components/MovieCast/MovieCast";
import MovieReviews from "./components/MovieReviews/MovieReviews";

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  useEffect(() => {
    const fetchMoviesByHomePage = async () => {
      const data = await fetchTrendingMovies();
      setTrendingMovies(data);
    };
    fetchMoviesByHomePage();
  }, []);

  return (
    <div>
      <header>
        <nav className={css.mainNav}>
          <NavLink
            className={({ isActive }) =>
              clsx(css.link, isActive && css.linkActive)
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              clsx(css.link, isActive && css.linkActive)
            }
            to="/movies"
          >
            Movies
          </NavLink>
        </nav>
      </header>
      <main className={css.headMain}>
        <Routes>
          <Route
            path="/"
            element={
              trendingMovies.length > 0 && <HomePage movies={trendingMovies} />
            }
          ></Route>
          <Route path="/movies" element={<MoviesPage />}></Route>
          <Route path="/movies/:moviesId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />}></Route>
            <Route path="reviews" element={<MovieReviews />}></Route>
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
