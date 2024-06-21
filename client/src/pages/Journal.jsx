import { useState } from "react";
import { Link } from "react-router-dom";
import "./Journal.css";

const Journal = () => {
  // Sample data for user entries (temporary)
  const [entries, setEntries] = useState([
    {
      id: 1,
      title: "Entry 1",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      title: "Entry 2",
      content:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    },
    // Add more entries as needed
  ]);

  return (
    <div className="journal">
      <Link to={"/addentry"}>Add Entry</Link>

      <div className="user-entries">
        <h2>Your Entries</h2>
        <ul>
          {entries.map((entry) => (
            <li key={entry.id}>
              <h3>{entry.title}</h3>
              <p>{entry.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Journal;
