import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import EditEntryForm from "../components/EditEntryForm";
import "./Journal.css";

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [deleteEntryID, setDeleteEntryID] = useState(null);
  const [editEntry, setEditEntry] = useState(null); // new state for editing an entry
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
      await axios.delete(`deleteentry/${entryID}`);
      fetchEntries();
      setDeleteEntryID(null);
    } catch (err) {
      console.error("Error deleting entry", err);
    }
  };

  const handleSaveEdit = async () => {
    await fetchEntries(); // Fetch the updated list of entries
    setEditEntry(null); // Clear the edit state
  };

  const handleCancelEdit = () => {
    setEditEntry(null); // Clear the edit state
  };

  return (
    <div className="journal">
      <div>
        {user ? <h2>{user.name}'s Entries</h2> : <h2>Loading...</h2>}
        <Link to={"/addentry"}>Add an Entry</Link>
      </div>
      <div className="user-entries">
        <ul>
          {entries.map((entry) => (
            <li key={entry._id}>
              <h3>{entry.location}</h3>
              <p>{entry.text}</p>
              {/* <img src={entry.photos[0]} alt="Entry Photo" /> */}
              <button onClick={() => setEditEntry(entry)}>Edit</button>
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
      {/* Edit Entry Form (modal)*/}
      {editEntry && (
        <div className="modal-background">
          <EditEntryForm
            entry={editEntry}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
          />
        </div>
      )}
    </div>
  );
};

export default Journal;
