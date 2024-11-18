import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import HomePage from './components/Homepage/HomePage';
import { checkInstallation } from './utils/api';

function App() {
  const [isInstalled, setIsInstalled] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [firstTime, setFirstTime] = React.useState(true);
  const params = new URLSearchParams(window.location.search);
  const shopDomain = params.get("shop");

  React.useEffect(() => {
    if (shopDomain) {
      console.log(`Shop parameter exists: ${shopDomain}`);
      checkInstallation(shopDomain)
        .then((response) => {
          setIsInstalled(response.installed);
          setFirstTime(response.first_time);
        })
        .catch((error) => {
          console.error("Error checking installation:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [shopDomain]);

  if (isLoading) {
    // Optionally render a loader while waiting for the shop check
    return <div>Loading...</div>;
  }

  if (!shopDomain) {
    // Redirect to an error page if the shop parameter is missing
    return <ErrorPage />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/error" element={<ErrorPage />} />
        <Route
          path="/dashboard"
          element={
            <HomePage
              isLoading={isLoading}
              isInstalled={isInstalled}
              params={params}
              firstTime={firstTime}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;



