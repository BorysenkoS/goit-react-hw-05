import css from "./App.module.css";
import clsx from "clsx";

import { fetchTrendingMovies } from "./pages/services/api";

import { lazy, Suspense, useEffect, useState } from "react";
import { NavLink, Routes, Route } from "react-router-dom";

// import Loader from "./components/Loader/Loader";
// import HomePage from "./pages/HomePage/HomePage";
// import MoviesPage from "./pages/MoviesPage/MoviesPage";
// import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
// import MovieCast from "./components/MovieCast/MovieCast";
// import MovieReviews from "./components/MovieReviews/MovieReviews";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);
const Loader = lazy(() => import("./components/Loader/Loader"));

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
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/"
              element={
                trendingMovies.length > 0 && (
                  <HomePage movies={trendingMovies} />
                )
              }
            ></Route>
            <Route path="/movies" element={<MoviesPage />}></Route>
            <Route path="/movies/:moviesId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />}></Route>
              <Route path="reviews" element={<MovieReviews />}></Route>
            </Route>
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
