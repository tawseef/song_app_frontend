import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/context";
import "./login.style.css";
import axios from "axios";
import { login_API_URL } from "../../api";

function Login() {
  const context = useContext(DataContext);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogIn = async (data)=>{
    const userLogin = await axios.post(login_API_URL, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (userLogin.status === 200) {
      persistLogin(userLogin.data.token, userLogin.data.userid);
      context.setUserEmail(data.email);
      context.setIsLoggedIn(userLogin.data.isLoggedIn);
    }
  }

  const persistLogin = (token, userid) => {
    localStorage.setItem("token", token);
    localStorage.setItem("isLoggedInId", userid);
  };

  const handleInputClick = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogIn(data);
    console.log("Form data:", data);
  };

  const handleSignUp = () =>{
    context.setUserSignup(false);    
  }

  return (
    <div className="wrapper">
      <div className="">
        <h1>Welcome to Song Application</h1>
      </div>
      <div className="">
        <h2>Login Here</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <div>
            <label htmlFor="Email">Email</label>
            <input
            required
              className="textBox"
              type="email"
              name="email"
              onChange={handleInputClick}
              value={data.email}
              placeholder="Enter E-mail Id"
            />
          </div>
          <div>
            <label htmlFor="Password">Password</label>
            <input
            required
              className="textBox"
              type="password"
              name="password"
              onChange={handleInputClick}
              value={data.password}
              placeholder="Enter Password"
            />
          </div>
          <div>
            <button className="submitBtn" type="submit">
              Login
            </button>
          </div>
        </div>
      </form>
            <button className="submitBtn" type="submit" onClick={handleSignUp}>
              Sign-Up
            </button>
    </div>
  );
}

export default Login;
