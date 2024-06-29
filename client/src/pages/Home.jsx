import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import travelImage from "../assets/travel.png";
import exampleEntry from "../assets/example.png";
import "./Home.css";

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/journal");
    }
  }, [user, navigate]);

  const scrollDown = () => {
    const contentSection = document.getElementById("example-title"); // ID of the section you want to scroll to
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-text">
          <h1>Welcome to Travel Journey</h1>
          <p>
            Capture your travel experiences, share stories, and keep all your
            memories in one place.
          </p>
          <div className="action-buttons">
            <button onClick={() => navigate("/signup")}>Sign Up</button>
            <button onClick={() => navigate("/login")}>Log In</button>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="feature-list">
          <h3>Simple to Use</h3>
          <p>
            Easily interact with your entries through an intuitive interface.
          </p>
        </div>
        <div className="feature-list">
          <h3>Photos</h3>
          <p>
            Attach photos to your entries through urls to make your memories
            memorable.
          </p>
        </div>
        <div className="feature-list">
          <h3>Secure</h3>
          <p>Your data is secure and only accessible by you.</p>
        </div>
      </div>

      <div className="scroll-down" onClick={scrollDown}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="scroll-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      <div className="entry-example">
        <h1 id="example-title">Example Entry</h1>
        <img src={exampleEntry} alt="Example Travel Image" />
      </div>
    </div>
  );
};

export default Home;
