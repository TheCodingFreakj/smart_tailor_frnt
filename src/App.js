import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import HomePage from './components/Homepage/HomePage';
import { checkInstallation } from './utils/api';

function App() {
  const [isInstalled, setIsInstalled] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [firstTime, setFirstTime] = React.useState(true);
  const [shopParamss, setShop]= React.useState('')
  const [error, setError]= React.useState(false)

 
  const getLocation = (location)=>{
    setShop(location)
  }
  const pathname = shopParamss.pathname;
  const shop = pathname?.split("/").pop();

  console.log('Shop parameter:', shop);

  if(shop){
    localStorage.setItem("shopParams", shop)
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
          path="/dashboard/:shop"
          element={
            <HomePage
              isLoading={isLoading}
              isInstalled={isInstalled}
              firstTime={firstTime}
              getLocation={getLocation}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;



