import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Header.css"; // Import your CSS file

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNavigation = async (target) => {
    switch (target) {
      case "home":
        navigate("/");
        break;
      case "login":
        navigate("/login");
        break;
      case "signup":
        navigate("/signup");
        break;
      case "logout":
        try {
          await axios.post("/logout"); // Assuming you have a logout route on your server
          setUser(null); // Clear user data after logout
          navigate("/"); // Redirect to home after logout
        } catch (err) {
          console.error("Logout failed:", err);
        }
        break;
      default:
        break;
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="header">
      <div className="left-section" onClick={() => handleNavigation("home")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6 plane-svg-icon"
        >
          <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
        </svg>
        Travel Log
      </div>
      <div className="middle-section"></div>
      <div className="right-section" onClick={toggleDropdown}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            clipRule="evenodd"
          />
        </svg>
        {dropdownVisible && (
          <div className="dropdown-menu">
            {user ? ( // If user is logged in, show logout option
              <div
                className="dropdown-item"
                onClick={() => handleNavigation("logout")}
              >
                Logout
              </div>
            ) : (
              <>
                <div
                  className="dropdown-item"
                  onClick={() => handleNavigation("login")}
                >
                  Login
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => handleNavigation("signup")}
                >
                  Sign Up
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
