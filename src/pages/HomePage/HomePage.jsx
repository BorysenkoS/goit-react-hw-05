// import { Link } from "react-router-dom";
import css from "./HomePage.module.css";

import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../services/api";

import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchMoviesByHomePage = async () => {
      const data = await fetchTrendingMovies();
      setTrendingMovies(data);
    };
    fetchMoviesByHomePage();
  }, []);

  return (
    <div className={css.homePage}>
      <h2 className={css.homePageTitle}>Trending today</h2>
      <ul className={css.moviesList}>
        <MovieList trendingMovies={trendingMovies} />
      </ul>
    </div>
  );
};

export default HomePage;
