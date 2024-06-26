import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./EntryDetail.css";

const EntryDetail = () => {
  const [entry, setEntry] = useState(null);
  const { entryId } = useParams();

  console.log(entryId);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const res = await axios.get(`/entry/${entryId}`);
        setEntry(res.data);
      } catch (err) {
        console.error("Error fetching entry:", err.message, err);
      }
    };
    fetchEntry();
  }, [entryId]);

  if (!entry) {
    return <p>Loading...</p>;
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
      <h2>{entry.location}</h2>
      <h3>{formatDate(entry.date)}</h3>
      <p>{entry.text}</p>
      {entry.photos &&
        entry.photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Entry Photo ${index + 1}: Invalid Link`}
          />
        ))}
      <Link to="/">Back to Entries</Link>
    </div>
  );
};

export default EntryDetail;
