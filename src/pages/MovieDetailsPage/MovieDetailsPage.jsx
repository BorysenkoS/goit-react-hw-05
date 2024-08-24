import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import css from "./MovieDetailsPage.module.css";

import { fetchMoviesDetails } from "../services/api";

const MovieDetailsPage = () => {
  const { moviesId } = useParams();
  const [moviesDetails, setMoviesDetails] = useState([]);

  useEffect(() => {
    const fetchMoviesByMoviesPage = async () => {
      const data = await fetchMoviesDetails(moviesId);
      console.log(data);

      setMoviesDetails(data);
    };
    fetchMoviesByMoviesPage();
  }, [moviesId]);

  return (
    <div className={css.movieDetailsPage}>
      <img
        src={`https://image.tmdb.org/t/p/w500/${moviesDetails.poster_path}`}
        alt={moviesDetails.overview}
        width={"250px"}
      />
      <div>
        <h3 className={css.moviesDetailsTitle}>{moviesDetails.title}</h3>
        <ul className={css.moviesDetailsList}>
          <li className={css.moviesDetailsItem}>
            <p className={css.moviesDetailsText}>
              Data: {moviesDetails.release_date}
            </p>
          </li>
          <li className={css.moviesDetailsItem}>
            <p className={css.moviesDetailsText}>
              User Score: {moviesDetails.vote_average}
            </p>
          </li>
          <li className={css.moviesDetailsItem}>
            <h3 className={css.moviesDetailsTitle}>Overview</h3>
            <p className={css.moviesDetailsText}>{moviesDetails.overview}</p>
          </li>
          <li className={css.moviesDetailsItem}>
            <h4>Genres</h4>
            <p></p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
