import axios from "axios";
import { useState } from "react";

const EditEntryForm = ({ entry, onSave, onCancel }) => {
  const [location, setLocation] = useState(entry.location);
  const [text, setText] = useState(entry.text);

  const handleSave = async () => {
    try {
      await axios.put(`/editentry/${entry._id}`, { location, text });
      onSave();
    } catch (err) {
      console.error("Error editing entry:", err.message, err);
    }
  };

  return (
    <div className="edit-entry-form">
      <h3>Edit Entry</h3>
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      <label>
        Text:
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditEntryForm;
