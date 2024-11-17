import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import HomePage from './components/Homepage/HomePage';
import ProtectedRoute from "./utils/ProtectedRoute";


function App() {
  return (
    <Router>
      <Routes>
        {/* Define the /error route with the ErrorPage component */}
        <Route path="/error" element={<ErrorPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;


