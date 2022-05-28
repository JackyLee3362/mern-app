import React, { useState, useEffect } from "react";
import Input from "./common/Input";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { useNavigate } from "react-router-dom";
import { register } from "../services/userService";

const RegisterForm = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const schema = {
    name: Joi.string().required().label("姓名"),
    email: Joi.string().required().label("Email").email(),
    password: Joi.string().required().label("Password"),
  };
  const handleSubmit = async (e) => {
    try {
      const newUser = {
        email: data.email,
        name: data.name,
        password: data.password,
      };
      await register(newUser);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        errors.email = ex.response.data;
        console.log(ex);
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
      <h1>注册</h1>
      <Input
        name="email"
        value={data.email}
        label="电子邮箱"
        type="text"
        placeholder="请输入邮箱"
        onChange={(event) => handleChange(event)}
      />
      <Input
        name="name"
        value={data.name}
        label="用户名"
        type="text"
        placeholder="请输入用户名"
        onChange={(event) => handleChange(event)}
      />
      <Input
        name="password"
        value={data.password}
        label="密码"
        type="password"
        placeholder="请输入密码"
        onChange={(event) => handleChange(event)}
      />
      <button
        className="btn btn-primary"
        onClick={(event) => handleSubmit(event)}
      >
        注册
      </button>
    </div>
  );
};

export default RegisterForm;
