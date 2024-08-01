import React from 'react';
import '../styles/Header.css';
import { isLoggedIn } from './Auth';
import { Link } from 'react-router-dom';
import Logout from './Logout';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="home-link nav-link"><h1>Welcome to the Ice Cream Truck</h1></Link>
      {!isLoggedIn() ? (
        <nav className="nav-links">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="nav-link">Sign Up</Link>
        </nav>
      ) : (
        <nav className="nav-links">
          <Link to="/cart" className="nav-link">Cart</Link>
          <Logout />
        </nav>
      )}
    </header>
  );
}


export default Header;
