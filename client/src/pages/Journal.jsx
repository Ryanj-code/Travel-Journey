import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import "./Journal.css";

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [deleteEntryID, setDeleteEntryID] = useState(null);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/profile");
        setUser(data);
      } catch (err) {
        console.error("Error fetching user profile:", err.message, err);
      }
    };
    // fetch user info here with "/profile" instead of using UserContext
    // Issue: Using user directly from UserContext leads to user being null
    // which means that user isn't fetched in time for fetchEntries.
    fetchUser();
  }, [setUser]);

  useEffect(() => {
    fetchEntries();
  }, [user]);

  const fetchEntries = async () => {
    if (user && user.id) {
      try {
        const res = await axios.get("/getentries", {
          params: { userID: user.id },
        });
        setEntries(res.data);
      } catch (err) {
        console.error("Error fetching entries:", err.message, err);
      }
    }
  };

  const handleDeleteEntry = async (entryID) => {
    try {
      await axios.delete(`deleteentry/${entryID}`);
      fetchEntries();
      setDeleteEntryID(null);
    } catch (err) {
      console.error("Error deleting entry", err);
    }
  };

  return (
    <div className="journal">
      <Link to={"/addentry"}>Add Entry</Link>

      <div className="user-entries">
        <h2>Your Entries</h2>
        <ul>
          {entries.map((entry) => (
            <li key={entry._id}>
              <h3>{entry.location}</h3>
              <p>{entry.text}</p>
              <button onClick={() => setDeleteEntryID(entry._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Modal or confirmation dialog for delete */}
      {deleteEntryID && (
        <div className="modal-background">
          <div className="delete-confirmation">
            <p>Are you sure you want to delete this entry?</p>
            <button onClick={() => handleDeleteEntry(deleteEntryID)}>
              Confirm Delete
            </button>
            <button onClick={() => setDeleteEntryID(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Journal;
