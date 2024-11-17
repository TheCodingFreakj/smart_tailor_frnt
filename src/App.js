
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import HomePage from './components/Homepage/HomePage';
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {

  const shopDomain = new URLSearchParams(window.location.search).get("shop");
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

