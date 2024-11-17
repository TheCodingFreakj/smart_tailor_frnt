import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css'; // Optional: Add styles for the page

const ErrorPage = () => {
const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/'); // Redirect to the homepage or another route
  };

  return (
    <div className="error-page">
      <h1>Oops! Something went wrong</h1>
      <p>We couldn't complete your request. Please try again or contact support if the issue persists.</p>
      <button onClick={handleGoBack} className="back-button">
        Go Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;