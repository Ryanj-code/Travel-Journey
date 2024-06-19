import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom"; // Import Navigate from React Router
import { UserContext } from "../UserContext";
import axios from "axios";
import "./Form.css";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [redirect, setRedirect] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setRedirect(true); // Redirect if user is already logged in
    }
  }, [user]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Log in with: ", data);

    try {
      const res = await axios.post("/login", data);
      setUser(res.data);
      console.log("Login successful.");
      setRedirect(true);
    } catch (err) {
      console.log("Login Failed.", err);
    }
  };

  if (redirect) {
    return <Navigate to={"/journal"} />;
  }

  return (
    <div className="form-container">
      <div className="form-title">Login</div>
      <div className="separator"></div>
      <form className="form-fields" onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <div className="options-container">
        <div className="options-item">Don't have an account?</div>
        <Link to="/signup" className="options-item">
          Sign up here
        </Link>
      </div>
    </div>
  );
};

export default Login;
