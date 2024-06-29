import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import SearchFilter from "../components/SearchFilter";
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
        // console.log("User data fetched:", data); // Debug log
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

  const fetchEntries = async (filters = {}) => {
    try {
      const res = await axios.get("/getentries", {
        params: { userID: user.id, ...filters },
      });
      setEntries(res.data);
      // console.log("Entries data fetched:", res.data); // Debug log
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

  const handleSearch = (filteredEntries) => {
    setEntries(filteredEntries);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );

    return formattedDate;
  };

  return (
    <div className="journal">
      <div className="journal-header">
        {user ? <h2>{user.name}'s Entries</h2> : <h2>Loading...</h2>}
        <div className="journal-actions">
          <Link to={"/addentry"}>Add an Entry</Link>
          <SearchFilter onSearch={handleSearch} user={user} />
        </div>
      </div>
      <div className="user-entries">
        <ul>
          {entries.map((entry) => (
            <li
              key={entry._id}
              onClick={() => handleDetailedEntryClick(entry._id)}
            >
              <h3>{entry.title}</h3>
              <p>
                {entry.location}, {formatDate(entry.date)}
              </p>
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
