import { useState } from "react";
import { Link } from "react-router-dom";
import "./Journal.css"; // Import your CSS file for styling

const Journal = () => {
  return (
    <div className="journal">
      <Link to={"/addentry"}>Add Entry</Link>
    </div>
  );
};

export default Journal;
