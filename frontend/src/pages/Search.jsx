import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./Search.css";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to products page with search query
      navigate(`/products?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="search-container">
      <Header showProductsButton={true} />
      <div className="search-content">
        <h2>Search for Products</h2>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default Search;
