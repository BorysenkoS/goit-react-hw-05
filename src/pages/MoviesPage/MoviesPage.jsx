import css from "./MoviesPage.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { Link } from "react-router-dom";

import { fetchSearchMovies } from "../services/api";

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

// useEffect(() => {
//   if (searchValue.trim() === "") return;
//   const fetchPhotosBySearchValue = async () => {
//     try {
//       setLoading(true);

//       const data = await fetchPhotosApi(searchValue, pageNumber);

//       setPhotos((prev) => [...prev, ...data.results]);
//       setTotalPage(data.total_pages);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   fetchPhotosBySearchValue();
// }, [searchValue, pageNumber]);

// const onSubmit = (searchTerm) => {
//   setPhotos([]);
//   setSearchValue(searchTerm);
//   setPageNumber(1);
// };

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState("");

  useEffect(() => {
    if (searchMovies.trim === "") return;
    const searchMoviesBySearchValue = async () => {
      const data = await fetchSearchMovies(searchMovies);
      setMovies(data.results);
    };
    searchMoviesBySearchValue();
  }, [searchMovies]);
  const handleSubmit = (values, actions) => {
    setSearchMovies(values.searchTerm);
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
