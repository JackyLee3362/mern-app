import "./App.css";
import React from "react";
import NavBar from "./components/common/navbar";
import { useRoutes } from "react-router-dom";
import "./App.css";

import Website from "./components/websites";
import WebsiteForm from "./components/websiteForm";
import LoginForm from "./components/loginForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //8.23
import RegisterForm from "./components/registerForm";

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <h1>Homepage</h1>,
    },
    {
      path: "/websites",
      element: <Website />,
    },
    {
      path: "/websites/:id",
      element: <WebsiteForm />,
    },
    { path: "/login", element: <LoginForm /> },
    { path: "/register", element: <RegisterForm /> },
  ]);
  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar />
      {routes}
    </React.Fragment>
  );
}

export default App;
