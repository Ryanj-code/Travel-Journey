import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./EntryForm.css";

const EntryForm = ({ initialFormData, onSubmit, redirectPath }) => {
  const [formData, setFormData] = useState({
    ...initialFormData,
    date: initialFormData.date ? initialFormData.date.split("T")[0] : "",
    photos:
      initialFormData.photos && initialFormData.photos.length > 0
        ? initialFormData.photos
        : [""],
  });
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setFormData({
      ...initialFormData,
      date: initialFormData.date ? initialFormData.date.split("T")[0] : "",
      photos:
        initialFormData.photos && initialFormData.photos.length > 0
          ? initialFormData.photos
          : [""],
    });
  }, [initialFormData]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (name.startsWith("photo-")) {
      const newPhotos = [...formData.photos];
      newPhotos[index] = value;
      setFormData({ ...formData, photos: newPhotos });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addPhotoField = () => {
    setFormData({ ...formData, photos: [...formData.photos, ""] });
  };

  const deletePhotoField = () => {
    if (formData.photos.length > 1) {
      const newPhotos = [...formData.photos];
      newPhotos.pop(); // Remove the last element
      setFormData({ ...formData, photos: newPhotos });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter out empty photo URLs
    const filteredPhotos = formData.photos.filter(
      (photo) => photo.trim() !== ""
    );

    const modifiedData = {
      ...formData,
      photos: filteredPhotos,
    };

    try {
      await onSubmit(modifiedData);
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
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title || ""}
        onChange={handleChange}
        placeholder="Title of your entry"
        required
      />

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
        placeholder="Location, Eg. United States"
        required
      />

      <label htmlFor="content">Your Entry:</label>
      <textarea
        id="content"
        name="content"
        value={formData.content || ""}
        onChange={handleChange}
        rows="10"
        required
        placeholder="Contents of your entry"
      ></textarea>

      <div className="photo-inputs">
        <label>Photo URL(s):</label>
        {formData.photos.map((photo, index) => (
          <input
            key={index}
            type="text"
            id={`photo-${index}`}
            name={`photo-${index}`}
            value={photo}
            onChange={(e) => handleChange(e, index)}
            placeholder="Photo URL"
          />
        ))}
      </div>
      <div className="photo-buttons">
        <button type="button" onClick={addPhotoField}>
          Add another photo
        </button>
        <button type="button" onClick={deletePhotoField}>
          Delete last photo
        </button>
      </div>

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default EntryForm;
