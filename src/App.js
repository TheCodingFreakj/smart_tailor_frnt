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
  const [error, setError]= React.useState(false)

  const params = new URLSearchParams(window.location.search);
  const shopParams = params.get('shop');

  console.log('Shop parameter:', shopParams);

  if(shopParams){
    localStorage.setItem("shopParams", shopParams)
    setShop(localStorage.getItem("shopParams"))
  }

  React.useEffect(() => {


      console.log(`Shop parameter exists: ${shop}`);
      checkInstallation(localStorage.getItem("shopParams"))
        .then((response) => {
          if(response == undefined){
            setError(true)
          }
          setIsInstalled(response.installed);
          setFirstTime(response.first_time);
          setShop(response.shop_name)
        })
        .catch((error) => {
          setError(true)
          console.error("Error checking installation:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    
  }, [shop]);
  if (error == true) {
    return <ErrorPage />;
  }
  if (isLoading) {
    // Optionally render a loader while waiting for the shop check
    return <div>Loading...</div>;
  }

  if (firstTime == false && isInstalled == false) {
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
              firstTime={firstTime}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;



