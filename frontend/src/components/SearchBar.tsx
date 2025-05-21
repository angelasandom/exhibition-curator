import React from "react";

const SearchBar: React.FC = () => {
    return(
        <>
        <div className="search-box">
              <input type="text" placeholder="Search artwork" />
              <button>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
        </>
    )
};

export default SearchBar;