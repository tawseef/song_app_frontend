import React, { useState } from "react";
import "./signup.style.css";

function Signup() {
  const [data, setData] = useState({
    email: "",
    password: "",
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
        <h2>Sign-up Here</h2>
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
            <button className="submitBtn" type="submit">
              Sign-up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
