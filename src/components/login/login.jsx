import React, { useState } from "react";
import "./login.style.css";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPass: "",
  });

  const handleInputClick = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", data);
  };

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
              className="textBox"
              type="password"
              name="password"
              onChange={handleInputClick}
              value={data.password}
              placeholder="Enter Password"
            />
          </div>
          <div>
            <label htmlFor="Confirm Password">Confirm Password</label>
            <input
              className="textBox"
              type="password"
              name="confirmPass"
              onChange={handleInputClick}
              value={data.confirmPass}
              placeholder="Confirm Password"
            />
          </div>
          <div>
            <button className="submitBtn" type="submit">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
