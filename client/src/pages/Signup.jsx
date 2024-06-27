import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import "./Form.css";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [redirect, setRedirect] = useState(false);
  const { user, setUser } = useContext(UserContext);

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
      setUser(res.data);
      setRedirect(true);
      console.log("Sign up successful.");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  if (redirect) {
    return <Navigate to={"/journal"} />;
  }

  return (
    <div className="form-wrapper">
      <div className="form-container-signup">
        <div className="form-title">Let's create your account</div>
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
        <div className="options-container">
          <div className="options-item">Have an account?</div>
          <Link to="/login" className="options-item-link">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
