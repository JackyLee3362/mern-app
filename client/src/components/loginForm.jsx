import React, { useState, useEffect } from "react";
import Input from "./common/Input";
import Joi from "joi-browser";
import auth from "../services/authService";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const schema = {
    email: Joi.string().required().label("电子邮件").email(),
    password: Joi.string().required().label("密码"),
  };
  const handleSubmit = async (e) => {
    try {
      await auth.login(data.email, data.password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        errors.email = ex.response.data;
        setErrors(errors);
      }
    }
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
    <div>
      <h1>登录</h1>
      <Input
        name="email"
        value={data.email}
        label="电子邮箱"
        type="text"
        placeholder={data.email}
        onChange={(event) => handleChange(event)}
      />
      <Input
        name="password"
        value={data.password}
        label="密码"
        type="password"
        placeholder=""
        onChange={(event) => handleChange(event)}
      />
      <button
        className="btn btn-primary"
        onClick={(event) => handleSubmit(event)}
      >
        登录
      </button>
    </div>
  );
};

export default LoginForm;
