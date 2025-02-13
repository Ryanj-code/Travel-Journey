import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import EntryForm from "../components/EntryForm";
import "./EditEntryForm.css";

const EditEntryForm = () => {
  const { entryId } = useParams();
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const res = await axios.get(`/entry/${entryId}`);
        const entryData = res.data;
        // Convert the date to a format suitable for input type="date"
        entryData.date = new Date(entryData.date).toISOString().split("T")[0];
        setEntry(entryData);
      } catch (err) {
        console.error("Error fetching entry:", err.message, err);
      }
    };
    fetchEntry();
  }, [entryId]);

  const handleSaveEdit = async (formData) => {
    try {
      // Ensure that formData includes the correct field names expected by your backend
      await axios.put(`/editentry/${entryId}`, formData);
    } catch (err) {
      console.error("Error editing entry:", err.message, err);
    }
  };

  if (!entry) {
    return <p>Loading...</p>;
  }

  return (
    <div className="edit-entry">
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
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>
      </Link>
      <div className="entry-container">
        <h1>Edit Entry</h1>
        <EntryForm
          initialFormData={{
            title: entry.title,
            date: entry.date,
            location: entry.location,
            content: entry.content,
            photos: entry.photos,
            createdAt: entry.createdAt,
            updatedAt: entry.updatedAt,
            userID: entry.userID,
          }}
          onSubmit={handleSaveEdit}
          redirectPath="/journal"
        />
      </div>
    </div>
  );
};

export default EditEntryForm;
