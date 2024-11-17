import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isInstalled, children }) => {
  if (!isInstalled) {
    // Redirect to /error if not installed
    return <Navigate to="/error" />;
  }

  // Render the child component if installed
  return children;
};

export default ProtectedRoute;
