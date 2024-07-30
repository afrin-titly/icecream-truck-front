import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useCart();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
