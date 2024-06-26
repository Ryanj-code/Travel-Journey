import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import EditEntryForm from "../components/EditEntryForm";
import "./Journal.css";

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [deleteEntryID, setDeleteEntryID] = useState(null);
  const [editEntry, setEditEntry] = useState(null);
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
    // fetch user info here with "/profile" instead of using UserContext
    // Issue: Using user directly from UserContext leads to user being null
    // which means that user isn't fetched in time for fetchEntries.
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
    await fetchEntries();
    setEditEntry(null);
  };

  const handleCancelEdit = () => {
    setEditEntry(null);
  };

  const handleDetailedEntryClick = (entryId) => {
    console.log(entryId);
    navigate(`/entry/${entryId}`);
  };

  const handleEditClick = (event, entry) => {
    event.stopPropagation();
    setEditEntry(entry);
  };
  // The event.stopPropagation() is used to ensure that clicking the "Edit" or "Delete"
  // buttons doesn't trigger the onClick handler in the parent li element

  const handleDeleteClick = (event, entryID) => {
    event.stopPropagation();
    setDeleteEntryID(entryID);
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
            <li
              key={entry._id}
              onClick={() => handleDetailedEntryClick(entry._id)}
            >
              <h3>{entry.location}</h3>
              <p>{entry.text}</p>
              <button onClick={(event) => handleEditClick(event, entry)}>
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
