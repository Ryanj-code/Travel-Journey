import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import "./Journal.css";

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [deleteEntryID, setDeleteEntryID] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/profile");
        setUser(data);
      } catch (err) {
        console.error("Error fetching user profile:", err.message, err);
      }
    };
    fetchUser();
  }, [setUser]);

  useEffect(() => {
    if (user && user.id) {
      fetchEntries();
    }
  }, [user]);

  const fetchEntries = async () => {
    try {
      const res = await axios.get("/getentries", {
        params: { userID: user.id },
      });
      setEntries(res.data);
    } catch (err) {
      console.error("Error fetching entries:", err.message, err);
    }
  };

  const handleDeleteEntry = async (entryID) => {
    try {
      await axios.delete(`/deleteentry/${entryID}`);
      fetchEntries();
      setDeleteEntryID(null);
    } catch (err) {
      console.error("Error deleting entry", err);
    }
  };

  const handleDetailedEntryClick = (entryID) => {
    navigate(`/entry/${entryID}`);
  };

  const handleEditEntryClick = (entryID) => {
    navigate(`/editentry/${entryID}`);
  };

  const handleEditClick = (event, entryID) => {
    event.stopPropagation();
    handleEditEntryClick(entryID);
  };

  const handleDeleteClick = (event, entryID) => {
    event.stopPropagation();
    setDeleteEntryID(entryID);
  };

  return (
    <div className="journal">
      <div className="journal-header">
        {user ? <h2>{user.name}'s Entries</h2> : <h2>Loading...</h2>}
        <Link to={"/addentry"}>Add an Entry</Link>
      </div>
      <div className="user-entries">
        <ul>
          {entries.map((entry) => (
            <li
              key={entry._id}
              onClick={() => handleDetailedEntryClick(entry._id)}
            >
              <h3>{entry.location}</h3>
              <p>{entry.content}</p>
              <button onClick={(event) => handleEditClick(event, entry._id)}>
                Edit
              </button>
              <button onClick={(event) => handleDeleteClick(event, entry._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
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
