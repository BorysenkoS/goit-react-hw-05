import { Link } from "react-router-dom";
import css from "./HomePage.module.css";

const HomePage = ({ movies }) => {
  return (
    <div>
      <h2 className={css.homePageTitle}>Trending today</h2>
      <ul className={css.moviesList}>
        {movies.map((mov) => {
          return (
            <li className={css.moviesItem} key={mov.id}>
              <Link
                to={`/movies/${mov.id}`}
                className={css.moviesLink}
                key={mov.id}
              >
                {mov.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HomePage;
