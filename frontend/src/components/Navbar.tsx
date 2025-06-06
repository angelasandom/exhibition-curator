import React from "react";
import { useUser } from "../context/UserContext";
import "./Navbar.css"

const Navbar: React.FC = () => {
    const { user, logout } = useUser();
    const handleLogout = () => {
    logout();
    alert("You have been logged out.");
  };
    return(
        <>
          <h1 className='header-title'>Exhibition Curator</h1>
          <div className="navbar">
            <div className="nav-links">
              <a className="active" href="/"><i className="fa-solid fa-house"></i>Home</a>
              <a href="/mygallery"><i className="fa-solid fa-landmark"></i>My Art Gallery</a>
              {user ? (
              <div className="nav-user-actions">
                <span className="welcome-msg">Welcome, {user.displayName}</span>
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </div>
        ) : (
          <a href="/login" className="login-link">Login</a>
        )}
            </div>
          </div>
        </>
    )
  }

  export default Navbar;