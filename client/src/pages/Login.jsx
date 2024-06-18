import { useContext, useState } from "react";
import { Navigate } from "react-router-dom"; // Import Navigate from React Router
import { UserContext } from "../UserContext";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

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
      console.log("Login Failed.");
      console.log(e);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="login-container">
      <div className="login-title">Login</div>
      <div className="separator"></div>
      <form className="login-form" onSubmit={handleLogin}>
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
    </div>
  );
};

export default Login;
