import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Management.css';

function Management() {

  return (
    <div className="management-screen">
      <h2>Management Dashboard</h2>
      <div className="management-options">
        <Link to="/management/items" className="management-link">
          <button className="management-button">Items</button>
        </Link>
        <Link to="/management/create-category" className="management-link">
          <button className="management-button">Categories</button>
        </Link>
        <Link to="/management/create-flavor" className="management-link">
          <button className="management-button">Flavors</button>
        </Link>
        <Link to="/management/inventory" className="management-link">
          <button className="management-button">Inventory</button>
        </Link>
        <Link to="/management/monthly-summary" className="management-link">
          <button className="management-button">Monthly Summary</button>
        </Link>
      </div>
    </div>
  );
}

export default Management;
