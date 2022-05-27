import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { saveWebsite, putWebsite } from "../services/websiteService";
import { getWebsite } from "../services/websiteService";
import Input from "./common/Input";
const WebsiteForm = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    name: "",
    url: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getWebsite(id);
        setData(res.data);
      } catch (ex) {
        console.log(ex);
      }
    }
    if (id !== "new") {
      fetchData();
    }
  }, []); // 需要添加空数组，避免无限循环
  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveWebsite(data);
    navigate("/websites");
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
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <h1>Movie {id}</h1>
      <div className="form-group mb-3">
        <form action="">
          <Input
            name="name"
            value={data.name}
            label="网站名称"
            type="text"
            placeholder={data.name}
            onChange={(event) => handleChange(event)}
          />
          <Input
            name="url"
            value={data.url}
            label="网址"
            type="text"
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
