import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import css from "./MovieReviews.module.css";

import { fetchMoviesReviews } from "../../pages/services/api";

import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const MovieReviews = () => {
  const { moviesId } = useParams();
  const [moviesReviews, setMoviesReviews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const data = await fetchMoviesReviews(moviesId);
        setMoviesReviews(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [moviesId]);
  return (
    <>
      {loading && <Loader />}
      {error !== null && <ErrorMessage errorMessage={error} />}
      {moviesReviews?.results?.length !== 0 ? (
        moviesReviews?.results?.map((result) => (
          <div key={result.id}>
            <h3>
              <span>Author:</span> {result.author}
            </h3>
            <p>
              <span>{result.content}</span>
            </p>
          </div>
        ))
      ) : (
        <div className={css.reviewsMessage}>
          Sorry, but we don&apos;t have any reviews for this movie...
        </div>
      )}
    </>
  );
};

export default MovieReviews;
