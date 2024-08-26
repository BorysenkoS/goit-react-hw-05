import { Link, useLocation } from "react-router-dom";

import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  const location = useLocation();

  return (
    <div className={css.notFoundPage}>
      <Link to="/" state={location}>
        Home page
      </Link>
      <p className={css.notFoundPageText}>Sorry, this page is not found!</p>
    </div>
  );
};

export default NotFoundPage;
