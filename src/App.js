import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import HomePage from './components/Homepage/HomePage';
import { checkInstallation } from './utils/api';

function App() {
  const [isInstalled, setIsInstalled] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [firstTime, setFirstTime] = React.useState(true);
  const [accessToken, setAccessToken]= React.useState('')
  const [error, setError]= React.useState(false)




 
    // Get the pathname from the window's location
    const pathname = window.location.pathname; // e.g., /dashboard/smarttailor324.myshopify.com

    // Split the pathname and extract the shop value
    const segments = pathname.split("/");
    const shopId = segments.length > 3 ? segments[3] : null;
    const shop = segments.length > 3 ? segments[2] : null;

   
// Wait for the page to fully load before accessing performance data
window.onload = () => {
  // Get all resources (including network calls)
  const resources = performance.getEntriesByType('resource');
  
  // Log the URLs of all resource calls
  resources.forEach((resource) => {
    console.log('Resource URL:', resource.name);
  });
};
   
    

  React.useEffect(() => {
    
      console.log(`Shop parameter exists: ${shopId}`);

      if(shopId){

        if(shopId){
          localStorage.setItem("shopParams", shopId)
         
        }
        checkInstallation(localStorage.getItem("shopParams"))
          .then((response) => {
            console.log(response)
            if(response == undefined){
              setError(true)
            }
            setIsInstalled(response.installed);
            setFirstTime(response.first_time);
            setAccessToken(response.access_token)
          })
          .catch((error) => {
            setError(true)
            console.error("Error checking installation:", error);
          })
          .finally(() => {
            setIsLoading(false);
          });

      }


    
  }, []);
  if (error == true) {
    return <ErrorPage />;
  }

  if(accessToken == ""){
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
          path="/dashboard/:shop/:id"
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



