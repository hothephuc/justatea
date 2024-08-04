import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../assets/search-icon.png'; // Ensure this path is correct
import '../searchBar/SearchBar.css';

const SearchBar = ({ onSearchSubmit }) => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(searchInput.toLowerCase());
    navigate('/search'); // Redirect to search page
  };

  return (
    <div className='search-bar-wrapper'>
      <form className='search-form' onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={handleSearchInputChange}
          className='search-bar'
        />
        <button type="submit" className='search-button'>
          <img src={searchIcon} alt="Search Icon" /> {/* Add icon here */}
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
