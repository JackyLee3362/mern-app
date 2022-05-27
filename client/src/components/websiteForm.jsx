import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { saveWebsite } from "../services/websiteService";
const WebsiteForm = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    name: "",
    url: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveWebsite(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <React.Fragment>
      <h1>New Movie</h1>
      <h1>{id}</h1>
      <div className="form-group mb-3">
        <form action="">
          <label className="form-label" htmlFor="name">
            name
          </label>
          <input
            autoFocus
            className="form-control"
            type="text"
            name="name"
            value={data.name}
            placeholder="输入网站名称"
            onChange={(event) => handleChange(event)}
          />
          <label className="form-label" htmlFor="url">
            url
          </label>
          <input
            className="form-control"
            type="text"
            name="url"
            value={data.value}
            placeholder="输入网址"
            onChange={(event) => handleChange(event)}
          />
          <button
            className="btn btn-primary"
            onClick={(event) => handleSubmit(event)}
          >
            提交
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default WebsiteForm;
