import { useState } from "react";
import "./AddEntry.css"; // Import your CSS file for styling

const AddEntry = () => {
  const [formData, setFormData] = useState({
    date: "",
    location: "",
    mood: "",
    entry: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Clear form fields after submission
    setFormData({
      date: "",
      location: "",
      mood: "",
      entry: "",
    });
  };

  return (
    <div className="add-entry">
      <div className="entry-container">
        <h1>Add an Entry</h1>
        <form onSubmit={handleSubmit} className="entry-form">
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
          ></textarea>

          <button type="submit" className="submit-button">
            Save Entry
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEntry;
