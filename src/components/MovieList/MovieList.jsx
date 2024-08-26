import css from "./MovieList.module.css";

import { useLocation, Link } from "react-router-dom";

const MovieList = ({ trendingMovies }) => {
  const location = useLocation();

  return trendingMovies.map((mov) => {
    return (
      <li className={css.moviesItem} key={mov.id}>
        <Link
          state={{ from: location }}
          to={`/movies/${mov.id}`}
          className={css.moviesLink}
          key={mov.id}
        >
          {mov.title}
        </Link>
      </li>
    );
  });
};

export default MovieList;
