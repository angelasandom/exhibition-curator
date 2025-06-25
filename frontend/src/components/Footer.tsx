import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-about">
          Explore and collect digital art from Harvard and Cleveland Museums.
        </p>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/mygallery">My Gallery</Link>
          <Link to="/login">Login</Link>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()}  Angela Sanchez Dominguez.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
