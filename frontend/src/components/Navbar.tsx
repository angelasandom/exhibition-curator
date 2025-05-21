import React from "react";
import SearchBar from "./SearchBar";
import "./Navbar.css"

const Navbar: React.FC = () => {
    return(
        <>
          <div className="navbar">
            <div className="nav-links">
              <a className="active" href="#"><i className="fa-solid fa-house"></i>Home</a>
              <a href="#"><i className="fa-solid fa-landmark"></i>My Art Gallery</a>
              <a href="#"><i className="fa-solid fa-user-gear"></i>Profile</a>
            </div>
            <SearchBar />
          </div>
        </>
    )
  }

  export default Navbar;