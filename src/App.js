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
  console.log(params.has("shop"))


  React.useEffect(() => {
    if (params.has("shop") && shopDomain) {
      console.log(`Shop parameter exists: ${shopDomain}`);
      const response = checkInstallation(shopDomain);
      setIsInstalled(response.is_installed)
      setFirstTime(response.first_time)
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }
  }, [])



  return (

    <Router>
      <Routes>
        <Route path="/error" element={<ErrorPage />} />
        <Route
          path="/dashboard"
          element={

            <HomePage isLoading={isLoading} isInstalled={isInstalled} params={params} firstTime={firstTime} />

          }
        />

      </Routes>
    </Router>

  )


}

export default App;


