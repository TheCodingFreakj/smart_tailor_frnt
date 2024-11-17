import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import HomePage from './components/Homepage/HomePage';
import ProtectedRoute from "./utils/ProtectedRoute";
import { checkInstallation } from './utils/api';

function App() {
const [isInstalled, setIsInstalled] = React.useState(false);
const params = new URLSearchParams(window.location.search);
const shopDomain = params.get("shop");


if (params.has("shop") && shopDomain) {
  console.log(`Shop parameter exists: ${shopDomain}`);
  const isInstalledVar = checkInstallation(shopDomain);
  setIsInstalled(isInstalledVar)
} 



  return (
    <Router>
      <Routes>
        {/* Define the /error route with the ErrorPage component */}
        <Route path="/error" element={<ErrorPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isInstalled={isInstalled} params={params}>
              <HomePage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;


