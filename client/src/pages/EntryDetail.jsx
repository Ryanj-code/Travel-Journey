import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./EntryDetail.css";

const EntryDetail = () => {
  const [entry, setEntry] = useState(null);
  const { entryId } = useParams();

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const res = await axios.get(`/entry/${entryId}`);
        setEntry(res.data);
      } catch (err) {
        console.error("Error fetching entry:", err.message, err);
        // Handle error state, e.g., setEntry(null) or show error message
      }
    };

    fetchEntry();
  }, [entryId]);

  if (!entry) {
    return <p>Loading...</p>; // Show loading state while fetching data
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );

    return formattedDate;
  };

  return (
    <div className="entry-detail">
      <h1 className="entry-title">{entry.title}</h1>
      <div className="entry-meta">
        <p>{entry.location}</p>
        <p>{formatDate(entry.date)}</p>
      </div>
      <p className="entry-content">{entry.content}</p>
      <div className="entry-photos">
        {entry.photos &&
          entry.photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Entry Photo ${index + 1}: Invalid Link`}
              className="entry-photo"
            />
          ))}
      </div>
      <Link to="/" className="back-link">
        Back to Entries
      </Link>
    </div>
  );
};

export default EntryDetail;
