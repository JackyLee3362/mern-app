import React, { useState, useEffect } from "react";
import { getWebsites } from "../services/websiteService";
import { NavLink } from "react-router-dom";
const Website = () => {
  let [websites, setWebsites] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getWebsites();
        setWebsites(res.data);
        console.log("done");
      } catch (ex) {
        console.log(ex);
      }
    }
    fetchData();
  }, []); // 需要添加空数组，避免无限循环
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-2"></div>
        <div className="col">
          <h1>Websites</h1>
          <NavLink to="/websites/new">
            <button className="btn btn-primary" sytle={{ marginBottom: 20 }}>
              New Website
            </button>
          </NavLink>
          {websites.map((w) => (
            <p key={w.url}>{w.name}</p>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Website;
