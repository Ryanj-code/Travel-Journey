import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import travelImage from "../assets/travel.png";
import "./Home.css";

const Home = () => {
  // const [redirect, setRedirect] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/journal");
    }
  }, [user, navigate]);

  const handleStart = () => {
    navigate("/signup");
  };

  return (
    <div>
      <div className="home-container">
        <button onClick={handleStart}>
          <h1>Start an Entry</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </button>

        {/* {user && <div className="user-name">{user.name}</div>} */}
        <img src={travelImage} alt="travel-image" className="scaled-image" />
      </div>
    </div>
  );
};

export default Home;
