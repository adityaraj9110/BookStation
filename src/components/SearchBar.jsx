import React, { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import "../components/searchbar.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [transferData, setTransferData] = useState([]);
  const [value, setValue] = useState({
    search: "",
    option: "title",
  });
  const { search, option } = value;
  const [suggestions, setSuggestions] = useState([]);
  let URL = `https://openlibrary.org/search.json?${option}=${search}`;

  const handleChange = (e) => {
    setValue((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const resultData = async () => {
    const res = await fetch(URL);
    const data = await res.json();
    setTransferData(data.docs);
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      if (search !== "") {
        resultData();
      }
    }, 3000);
    return () => clearTimeout(timeout);
  }, [URL, search]);

  const getSuggestions = async (value) => {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${value}&limit=5`
    );
    const data = await res.json();
    return data.docs.map((doc) => doc.title);
  };

  const handleClick = () => {
    console.log(transferData);
    console.log("cicl");
    const searchParams = new URLSearchParams();
    searchParams.append("data", JSON.stringify(transferData));
    navigate(`/searched/books?${searchParams.toString()}`);
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    const suggestions = await getSuggestions(value);
    setSuggestions(suggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (event, { newValue }) => {
    setValue((prev) => ({
      ...prev,
      search: newValue,
    }));
  };

  const getSuggestionValue = (suggestion) => {
    return suggestion;
  };
  
  const renderSuggestion = (suggestion) => {
    return (
      <div className="sugg" onClick={handleClick}>
        {suggestion}
      </div>
    );
  };

  

  const inputProps = {
    placeholder: "Search",
    value: search,
    onChange: onChange,
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <div className="auto">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        </div>
        {suggestions.length > 0 && (
          <div className="suggestions-container">
            <ul>
              {suggestions.map((suggestion, index) => (
                <li
                  className="suggestions-list"
                  key={index}
                  onClick={handleClick}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="option">
        <select name="option" id="" value={option} onChange={handleChange}>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="text">Text</option>
          <option value="publisher">Publisher</option>
          <option value="subject">Genre</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
