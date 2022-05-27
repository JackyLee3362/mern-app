import "./App.css";
import React from "react";
import NavBar from "./components/common/navbar";
import { useRoutes } from "react-router-dom";
import "./App.css";

import Website from "./components/websites";
import WebsiteForm from "./components/websiteForm";

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
  ]);
  return (
    <React.Fragment>
      <NavBar />
      {routes}
    </React.Fragment>
  );
}

export default App;
