// LoginForm.js
import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here, such as calling an API or checking credentials
    console.log("Logging in with:", { data });
  };

  return (
    <div className="login-container">
      <div className="login-title">Login</div>
      <div className="separator"></div>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          value={data.email}
          placeholder="Email"
          onChange={handleChange}
          required
          autoComplete="email"
        />
        <input
          type="password"
          value={data.password}
          placeholder="Password"
          onChange={handleChange}
          required
          autoComplete="new-password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
