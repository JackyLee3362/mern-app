import React from "react";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <React.Fragment>
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <span className="navbar-brand">
            <NavLink to="/">Home</NavLink>
          </span>
          <span className="navbar-brand clickable nav-item nav-link">
            <NavLink to="/websites">Websites</NavLink>
          </span>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
