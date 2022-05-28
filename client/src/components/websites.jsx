import React, { useState, useEffect } from "react";
import {
  getWebsites,
  deleteWebsite,
  saveWebsite,
} from "../services/websiteService";
import { NavLink } from "react-router-dom";
import WebsiteTable from "./websiteTable";
import { toast } from "react-toastify"; // 8.25
import _ from "lodash";

const Website = () => {
  const [websites, setWebsites] = useState([]);
  const [errors, setErrors] = useState({});

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
      toast("你不是管理员，不可以删除捏😀");
      setWebsites(originalWebsites);
    }
  };
  const handleLike = async (website) => {
    const originalWebsites = _.cloneDeep(websites);

    setWebsites(
      websites.map((w) => {
        if (w._id === website._id) w.like++;
        return w;
      })
    );
    console.log(originalWebsites);
    try {
      const res = await saveWebsite(website);
    } catch (ex) {
      toast("登录以后才可以点❤️哦");
      setWebsites(originalWebsites);
    }
  };
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-2"></div>
        <div className="col">
          <h1>网站收藏夹</h1>
          <NavLink to="/websites/new">
            <button className="btn btn-primary" sytle={{ marginBottom: 20 }}>
              添加网站
            </button>
          </NavLink>
          <WebsiteTable
            data={websites}
            onDelete={handleDelete}
            onLike={handleLike}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Website;
