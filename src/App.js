
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import HomePage from './components/Homepage/HomePage';

function App() {
  return (
    <Router>
      <Routes>
           {/* Define the /error route with the ErrorPage component */}
           <Route path="/error" element={<ErrorPage />} />
<Route path="/dashboard" element={<HomePage />} />
      
      </Routes>
    </Router>
  );
}

export default App;

