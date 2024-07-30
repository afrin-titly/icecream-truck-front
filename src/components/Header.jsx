import React from 'react';
import '../styles/Header.css';
import { isLoggedIn } from './Auth';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <h1>Welcome to the Ice Cream Truck</h1>
      {!isLoggedIn() && (
        <nav className="nav-links">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="nav-link">Sign Up</Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
