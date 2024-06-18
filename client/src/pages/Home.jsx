import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import travelImage from "../assets/travel.png";
import "./Home.css"; // Import your CSS file for Home component styling
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/signup");
  };

  return (
    <div className="home">
      <div>
        <button onClick={handleStart}>
          <h1>Start your log</h1>
        </button>

        {user && <div className="user-name">{user.name}</div>}
      </div>
      <img src={travelImage} alt="travel-image" className="scaled-image" />
    </div>
  );
};

export default Home;
