import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./EntryForm.css";

const EntryForm = ({ initialFormData, onSubmit, redirectPath }) => {
  const [formData, setFormData] = useState({
    ...initialFormData,
    date: initialFormData.date ? initialFormData.date.split("T")[0] : "",
  });
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setFormData({
      ...initialFormData,
      date: initialFormData.date ? initialFormData.date.split("T")[0] : "",
    });
  }, [initialFormData]);

  //console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setRedirect(true);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  if (redirect) {
    return <Navigate to={redirectPath} />;
  }

  return (
    <form onSubmit={handleSubmit} className="entry-form">
      <label htmlFor="date">Date:</label>
      <input
        type="date"
        id="date"
        name="date"
        value={formData.date || ""}
        onChange={handleChange}
        required
      />

      <label htmlFor="location">Location:</label>
      <input
        type="text"
        id="location"
        name="location"
        value={formData.location || ""}
        onChange={handleChange}
        placeholder="Eg. United States"
        required
      />

      <label htmlFor="entry">Your Entry:</label>
      <textarea
        id="entry"
        name="entry"
        value={formData.entry || ""}
        onChange={handleChange}
        rows="10"
        required
        className="entry-textarea"
        placeholder="Contents of your entry"
      ></textarea>

      <div className="photo-inputs">
        <label htmlFor="photoURL">Photo URL:</label>
        <input
          type="text"
          id="photoURL"
          name="photoURL"
          value={formData.photoURL || ""}
          onChange={handleChange}
          placeholder="photo url"
        />
      </div>

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default EntryForm;
