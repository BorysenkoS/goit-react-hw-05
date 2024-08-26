import css from "./Navigation.module.css";
import clsx from "clsx";

import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <nav className={css.mainNav}>
        <NavLink
          className={({ isActive }) =>
            clsx(css.link, isActive && css.linkActive)
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            clsx(css.link, isActive && css.linkActive)
          }
          to="/movies"
        >
          Movies
        </NavLink>
      </nav>
    </div>
  );
};

export default Navigation;
