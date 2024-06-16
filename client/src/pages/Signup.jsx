import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(data);
    /* try {
      const res = await axios.post("http://localhost:5000/signup", data);
      setMessage("Sign up successful!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Sign up failed. Please try again.");
    } */
  };

  return (
    <div className="signup-container">
      <div className="signup-title">Sign Up</div>
      <div className="separator"></div>
      <form className="signup-form" onSubmit={handleSignup}>
        <input
          type="text"
          name="name"
          value={data.name}
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          value={data.email}
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          value={data.password}
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default Signup;
