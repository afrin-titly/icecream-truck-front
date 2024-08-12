import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn, isTokenExpired, isAdmin } from './Auth';
import Login from './Login';

const ProtectedRoute = ({ element, adminOnly = false }) => {
  if (!isLoggedIn() || isTokenExpired()) {
    return <Login />;
  }

  if (adminOnly && !isAdmin()) {
    return <div>You do not have permission to view this page.</div>;
  }

  return element;
};

export default ProtectedRoute;
