import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Form.css";
import { UserContext } from "../UserContext";
import { Link, Navigate } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setRedirect(true);
    }
  }, [user]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("User sign up: ", data);

    try {
      const res = await axios.post("/signup", data);
      setMessage("Sign up successful!");
      setRedirect(true);
      console.log(res.data);
    } catch (err) {
      setMessage("Sign up failed. Please try again.");
      console.error(err);
    }
  };

  if (redirect) {
    return <Navigate to={"/journal"} />;
  }

  return (
    <div className="form-container">
      <div className="form-title">Sign Up</div>
      <div className="separator"></div>
      <form className="form-fields" onSubmit={handleSignup}>
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
      <div className="options-container">
        <div className="options-item">Have an account?</div>
        <Link to="/login" className="options-item">
          Login here
        </Link>
      </div>
    </div>
  );
};

export default Signup;
