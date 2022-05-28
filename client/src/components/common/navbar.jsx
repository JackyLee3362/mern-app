import React from "react";
import { NavLink } from "react-router-dom";
import { getCurrentUser, logout } from "../../services/authService";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const logoutAndNavigate = () => {
    logout();
    window.location = "/";
  };

  return (
    <React.Fragment>
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <span className="navbar-brand">
            <NavLink to="/">主页</NavLink>
          </span>
          <span className="navbar-brand clickable nav-item nav-link">
            <NavLink to="/websites">网站收藏夹</NavLink>
          </span>
          {user ? (
            <React.Fragment>
              <span className="navbar-brand clickable nav-item nav-link">
                {user.name}
              </span>
              <span className="navbar-brand clickable nav-item nav-link">
                <button className="btn btn-primary" onClick={logoutAndNavigate}>
                  登出
                </button>
              </span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <span className="navbar-brand clickable nav-item nav-link">
                <NavLink to="/register">注册</NavLink>
              </span>
              <span className="navbar-brand clickable nav-item nav-link">
                <NavLink to="/login">登录</NavLink>
              </span>
            </React.Fragment>
          )}
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
