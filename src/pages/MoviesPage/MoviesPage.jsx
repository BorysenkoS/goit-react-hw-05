import css from "./MoviesPage.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { Link, useLocation, useSearchParams } from "react-router-dom";
// import { lazy } from "react";

import { fetchSearchMovies } from "../services/api";
// const fetchSearchMovies = lazy(() => import("../services/api"));

import { useEffect, useState } from "react";

const SearchMovies = Yup.object().shape({
  searchTerm: Yup.string()
    .min(2, "Too Short! Min 2 symbols.")
    .max(50, "Too Long! Max 50 symbols.")
    .required("Required! Enter any word..."),
});

const initialValues = {
  searchTerm: "",
};

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();

  const query = searchParams.get("query");

  useEffect(() => {
    if (query === null) return;
    const searchMoviesBySearchValue = async () => {
      const data = await fetchSearchMovies(query);
      setMovies(data.results);
    };
    searchMoviesBySearchValue();
  }, [query]);
  const handleSubmit = (values, actions) => {
    setSearchParams({ query: values.searchTerm });
    actions.resetForm();
  };
  return (
    <div>
      <div className={css.searchBar}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={SearchMovies}
        >
          <Form>
            <label className={css.formLabel}>
              <Field
                className={css.searchInput}
                type="text"
                name="searchTerm"
                placeholder="Search movies"
              />
            </label>
            <button className={css.searchBtn} type="submit">
              Search
            </button>
            <br />
            <ErrorMessage
              className={css.formErrorMessage}
              name="searchTerm"
              component="span"
            />
          </Form>
        </Formik>
      </div>
      <div>
        {movies.map((mov) => {
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
        })}
      </div>
    </div>
  );
};

export default MoviesPage;
