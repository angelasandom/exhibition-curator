import React from "react";
import "./SearchBar.css";

interface Props {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedType: string;
  setSelectedType: (val: string) => void;
  onSearch: () => void;

}

const SearchBar: React.FC<Props> = ({
  searchTerm,
  setSearchTerm,
  selectedType,
   setSelectedType,
  onSearch,
}) => {
  const clearFilter = (filter: "type" | "style") => {
    if (filter === "type") setSelectedType("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <>

      <form className="search-box" onSubmit={handleSubmit}>
        <input
          type= "text"
          placeholder="Search artworks"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input"
        />
        <button type="submit" className="search-button">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="filter-select"
        >
          <option value="">All Types</option>
          <option value="Painting">Painting</option>
          <option value="Sculpture">Sculpture</option>
          <option value="Drawing">Drawing</option>
          <option value="Photograph">Photograph</option>
          <option value="Ceramic">Ceramic</option>
        </select>
      </form>

      <div className="active-filters">
        {selectedType && (
          <span className="filter-chip">
            {selectedType}
            <button onClick={() => clearFilter("type")}>x</button>
          </span>
        )}
      </div>
    </>
   );
};


export default SearchBar;
