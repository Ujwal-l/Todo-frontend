import React from "react";

const SearchTask = ({ searchQuery, setSearchQuery, searchTasks }) => {
  return (
    <input
      type="text"
      placeholder="Search Tasks"
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value);
        searchTasks(e.target.value);
      }}
    />
  );
};

export default SearchTask;
