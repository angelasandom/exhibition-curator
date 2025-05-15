import React from "react";
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
            <div className="search-box">
              <input type="text" placeholder="Search artwork" />
              <button>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          

            




          {/* <i className="fa-solid fa-images"></i>
          <i className="fa-solid fa-circle-user"></i>
          <i className="fa-solid fa-trash-can"></i>
          <i className="fa-solid fa-left-long"></i>
          <i className="fa-solid fa-user-gear"></i>
          <i className="fa-solid fa-right-long"></i>
          <i className="fa-solid fa-angle-left"></i>
          <i className="fa-solid fa-chevron-left"></i>
          <i className="fa-solid fa-chevron-right"></i>
          <i className="fa-solid fa-heart"></i>
          <i className="fa-regular fa-heart"></i>
 <div className="search-box">
                <input type="text" placeholder="Search artwork"></input>
                <button>
                  <i className="fa-solid fa-magnifying-glass icon search"></i>
                </button>
            </div>         <i className="fa-solid fa-circle-user"></i>
          <i className="fa-solid fa-share-nodes"></i>
          <i className="fa-solid fa-xmark"></i> */}
          </div>
        </>
    )
  }

  export default Navbar;