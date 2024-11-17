import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import HomePage from './components/Homepage/HomePage';
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const [shopDomain, setShopDomain] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const domain = new URLSearchParams(window.location.search).get("shop");
    setShopDomain(domain);

    // Simulate API check or processing if needed
    const validateShop = async () => {
      if (!domain) {
        navigate('/error'); // Redirect to error page if shopDomain is missing
      }
      setLoading(false);
    };

    validateShop();
  }, [navigate]);

  if (loading) {
    // Show a loading spinner while processing
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Define the /error route with the ErrorPage component */}
        <Route path="/error" element={<ErrorPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute shopDomain={shopDomain}>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


