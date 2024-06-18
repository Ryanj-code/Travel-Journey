import React, { useContext } from "react";
import { UserContext } from "../UserContext";

const Home = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      testing home
      {user && <div className="user-name">{user.name}</div>}
    </div>
  );
};

export default Home;
