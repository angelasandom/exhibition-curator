import React from "react";
import "./SearchBar.css";

interface Props {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedType: string;
  setSelectedType: (val: string) => void;

}

const SearchBar: React.FC<Props> = ({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
}) => {
  const clearFilter = () => {
    setSelectedType('');
  };

  return (
    <>

      <div className="search-box">
        <input
          type= "text"
          placeholder="Search artworks"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input"
        />
        
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
      </div>

      <div className="active-filters">
        {selectedType && (
          <span className="filter-chip">
            {selectedType}
            <button onClick={clearFilter}>x</button>
          </span>
        )}
      </div>
    </>
   );
};


export default SearchBar;
