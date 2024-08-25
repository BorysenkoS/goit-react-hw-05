import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import css from "./MovieDetailsPage.module.css";

import { fetchMoviesDetails } from "../services/api";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const MovieDetailsPage = () => {
  const { moviesId } = useParams();
  const [moviesDetails, setMoviesDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoviesByMoviesPage = async () => {
      try {
        setLoading(true);
        const data = await fetchMoviesDetails(moviesId);
        console.log(data);

        setMoviesDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMoviesByMoviesPage();
  }, [moviesId]);

  return (
    <>
      {loading && <Loader />}
      {error !== null && <ErrorMessage errorMessage={error} />}
      {moviesDetails !== null && (
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
                <p className={css.moviesDetailsText}>
                  {moviesDetails.overview}
                </p>
              </li>
              <li className={css.moviesDetailsItem}>
                <h3 className={css.moviesDetailsTitle}>Genres</h3>
                <p className={css.moviesDetailsText}>
                  {moviesDetails?.genres?.map((genre) => genre.name).join(", ")}
                </p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetailsPage;
