import React, { useState } from "react";
import axios from "axios";
import "./SearchFilter.css";

const SearchFilter = ({ onSearch, user }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchContent, setSearchContent] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("/getentries", {
        params: {
          userID: user.id,
          title: searchTitle,
          date: searchDate,
          location: searchLocation,
          content: searchContent,
        },
      });
      onSearch(res.data);
    } catch (err) {
      console.error("Error fetching filtered entries:", err.message, err);
    }
  };

  const handleClearSearch = () => {
    setSearchTitle("");
    setSearchDate("");
    setSearchLocation("");
    setSearchContent("");
  };

  return (
    <div className={"search-filter"}>
      <button
        className="search-filter-toggle"
        onClick={() => setSearchVisible(true)}
      >
        Search Filters
      </button>

      {searchVisible && (
        <div className="modal-background">
          <div className="search-filter-modal">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                className="search-input"
                placeholder="Search by Title"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />

              <input
                type="date"
                className="search-input"
                placeholder="Search by Date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
              />

              <input
                type="text"
                className="search-input"
                placeholder="Search by Location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />

              <input
                type="text"
                className="search-input"
                placeholder="Search by Content"
                value={searchContent}
                onChange={(e) => setSearchContent(e.target.value)}
              />

              <button type="submit" className="search-button">
                Search
              </button>
              <button
                className="search-filter-toggle"
                onClick={() => setSearchVisible(false)}
              >
                Hide Filters
              </button>
              <button
                type="submit"
                className="search-clear-button"
                onClick={handleClearSearch}
              >
                Clear
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
