import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Journal.css";
import { UserContext } from "../UserContext";
import axios from "axios";

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      handleDisplay(user.id);
    }
  }, [user]);

  const handleDisplay = async (userID) => {
    try {
      const res = await axios.get("/getentries", { params: { userID } });
      setEntries(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="journal">
      <Link to={"/addentry"}>Add Entry</Link>

      <div className="user-entries">
        <h2>Your Entries</h2>
        <ul>
          {entries.map((entry) => (
            <li key={entry.date}>
              <h3>{entry.location}</h3>
              <p>{entry.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Journal;
