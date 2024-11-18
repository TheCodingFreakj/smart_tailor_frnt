import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import HomePage from './components/Homepage/HomePage';
import { checkInstallation } from './utils/api';

function App() {
  const [isInstalled, setIsInstalled] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [firstTime, setFirstTime] = React.useState(true);
  const [shop, setShop]= React.useState('')
  const params = new URLSearchParams(window.location.search);
  const shopDomain = params.get("shop");

  React.useEffect(() => {
      console.log(`Shop parameter exists: ${shop}`);
      checkInstallation(shopDomain)
        .then((response) => {
          setIsInstalled(response.installed);
          setFirstTime(response.first_time);
          setShop(response.shop_name)
        })
        .catch((error) => {
          console.error("Error checking installation:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    
  }, []);

  if (isLoading) {
    // Optionally render a loader while waiting for the shop check
    return <div>Loading...</div>;
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



