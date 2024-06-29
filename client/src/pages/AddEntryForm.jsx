import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import EntryForm from "../components/EntryForm";
import "./AddEntryForm.css";

const AddEntryForm = () => {
  const { user } = useContext(UserContext);
  const [initialFormData, setInitialFormData] = useState({
    title: "",
    date: "",
    location: "",
    content: "",
    photos: [""],
    userID: "",
  });

  useEffect(() => {
    if (user) {
      setInitialFormData((prevData) => ({ ...prevData, userID: user.id }));
    }
  }, [user]);

  const handleAddEntry = async (formData) => {
    await axios.post("/addentry", formData);
  };

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
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>
      </Link>
      <div className="entry-container">
        <h1>Add an Entry</h1>
        <EntryForm
          initialFormData={initialFormData}
          onSubmit={handleAddEntry}
          redirectPath="/journal"
        />
      </div>
    </div>
  );
};

export default AddEntryForm;
