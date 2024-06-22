import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "./AddEntry.css";
import { UserContext } from "../UserContext";

const AddEntry = () => {
  const [formData, setFormData] = useState({
    date: "",
    location: "",
    entry: "",
    photoFile: null, // For file uploads
    photoURL: "", // For linking photos
    userID: "",
  });
  const [redirect, setRedirect] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setFormData({ ...formData, userID: user.id });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // For handling file uploads
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddEntry = async (e) => {
    e.preventDefault();

    console.log(formData);
    try {
      const res = await axios.post("/addentry", formData);
      setRedirect(true);
      console.log("Entry added:", res.data);
    } catch (err) {
      console.log(err);
    }
    // Clear form fields after submission
    setFormData({
      date: "",
      location: "",
      entry: "",
      photoFile: null,
      photoURL: "",
    });
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="add-entry">
      <Link to="/journal" className="icon-link">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="black"
          className="size-6 back"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>
      </Link>
      <div className="entry-container">
        <h1>Add an Entry</h1>
        <form onSubmit={handleAddEntry} className="entry-form">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Eg. United States"
            required
          />

          <label htmlFor="entry">Your Entry:</label>
          <textarea
            id="entry"
            name="entry"
            value={formData.entry}
            onChange={handleChange}
            rows="10"
            required
            className="entry-textarea"
            placeholder="Contents of your entry"
          ></textarea>

          <div className="photo-inputs">
            <label htmlFor="photoFile" className="upload-label">
              Upload Photo
            </label>
            <input
              type="file"
              id="photoFile"
              name="photoFile"
              onChange={handleChange}
              className="upload-input"
            />

            <label htmlFor="photoURL">Link Photo:</label>
            <input
              type="text"
              id="photoURL"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              placeholder="photo url"
            />
          </div>

          <button type="submit" className="submit-button">
            Add Entry
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEntry;
