import React, { useState, useEffect } from "react";
import { getWebsites, deleteWebsite } from "../services/websiteService";
import { NavLink } from "react-router-dom";
import WebsiteTable from "./websiteTable";
import http from "../services/httpService";
const Website = () => {
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getWebsites();
        setWebsites(res.data);
      } catch (ex) {
        console.log(ex);
      }
    }
    fetchData();
  }, []); // 需要添加空数组，避免无限循环
  const handleDelete = async (id) => {
    const originalWebsites = websites;
    setWebsites(websites.filter((w) => w._id !== id));
    try {
      const res = await deleteWebsite(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        console.error("This website has already been deleted.");
      setWebsites(originalWebsites);
    }
  };
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
          <WebsiteTable data={websites} onDelete={handleDelete} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Website;
