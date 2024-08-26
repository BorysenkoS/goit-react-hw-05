import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import css from "./MovieCast.module.css";

import { fetchMoviesCredits } from "../../pages/services/api";

import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const MovieCast = () => {
  const { moviesId } = useParams();
  const [moviesCredits, setMoviesCredits] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        setLoading(true);
        const data = await fetchMoviesCredits(moviesId);
        setMoviesCredits(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCredits();
  }, [moviesId]);
  return (
    <>
      {loading && <Loader />}
      {error !== null && <ErrorMessage errorMessage={error} />}
      <div className={css.movieCast}>
        {moviesCredits?.cast?.map((cast) => (
          <div key={cast.id} className={css.movieCastItem}>
            <img
              src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
              width={200}
              alt={cast.name}
            />
            <h3>{cast.name}</h3>
            <p>
              Character: <span>{cast.character}</span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default MovieCast;
