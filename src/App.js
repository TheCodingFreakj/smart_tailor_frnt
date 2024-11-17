import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import HomePage from './components/Homepage/HomePage';
import ProtectedRoute from "./utils/ProtectedRoute";
import { checkInstallation } from './utils/api';

function App() {
  const [isInstalled, setIsInstalled] = useState(false);
  const shopDomain = new URLSearchParams(window.location.search).get("shop");

  const navigate = useNavigate();

  useEffect(() => {
    const verifyInstallation = async () => {
      const isInstalledVar = await checkInstallation(shopDomain);
      if (!isInstalled) {
        navigate("/error");
      }

      setIsInstalled(isInstalledVar)
    };

    if (shopDomain != null) {
      verifyInstallation();

    }else{
      navigate("/error");
    }


  }, [shopDomain, navigate]);



  return (
    <Router>
      <Routes>
        {/* Define the /error route with the ErrorPage component */}
        <Route path="/error" element={<ErrorPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isInstalled={isInstalled}>
              <HomePage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;


