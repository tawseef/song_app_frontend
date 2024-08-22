import React, { useContext, useState } from "react";
import "./signup.style.css";
import { DataContext } from "../context/context";
import { signup_API_URL } from "../../api";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

function Signup() {
  const context = useContext(DataContext)

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(data.password === data.confirmPass){
      const userSignup = await axios.post(signup_API_URL, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(userSignup.status===200) context.setUserSignup(true);
      enqueueSnackbar("Signup Successful", { variant: 'success' })
    }else{
      enqueueSnackbar("Check Credentials", { variant: 'warning' })
    }
  };

  const handleLogIn =()=>{
    context.setUserSignup(true)
  }

  return (
    <div className="wrapper">
      <div className="">
        <h1>Welcome to Song Application</h1>
      </div>
      <div className="">
        <h2>Signup Here</h2>
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
            <label htmlFor="Confirm Password">Confirm Password</label>
            <input
            required
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
              Signup
            </button>
          </div>
        </div>
      </form>
            <button className="logIn" type="submit" onClick={handleLogIn}>
              Login
            </button>
    </div>
  );
}

export default Signup;
