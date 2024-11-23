import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import HomePage from './components/Homepage/HomePage';
import { checkInstallation } from './utils/api';
import {Provider, Loading} from '@shopify/app-bridge-react';
// Import Axios (ensure you have Axios installed, e.g., via npm or CDN)
import axios from 'axios';
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
    if(shopId){
        localStorage.setItem("shopParams", shopId)
      
    }
   


// Request Interceptor: This will run before the request is sent
axios.interceptors.request.use((request) => {
  console.log('Request URL:', request.url);  // Log the URL of the request
  console.log('Request Method:', request.method);  // Log the HTTP method (GET, POST, etc.)
  console.log('Request Headers:', request.headers);  // Log the request headers
  console.log('Request Body:', request.data);  // Log the request body (for POST requests)
  
  // You can modify the request here if needed before sending it
  return request;
}, (error) => {
  // Handle error before the request is sent
  console.error('Request Error:', error);
  return Promise.reject(error);
});

  // React.useEffect(() => {
    
  //     console.log(`Shop parameter exists: ${shopId}`);

  //     if(shopId){

  
  //       checkInstallation(localStorage.getItem("shopParams"))
  //         .then((response) => {
  //           console.log(response)
  //           if(response == undefined){
  //             setError(true)
  //           }
  //           setIsInstalled(response.installed);
  //           setFirstTime(response.first_time);
  //           setAccessToken(response.access_token)
  //         })
  //         .catch((error) => {
  //           setError(true)
  //           console.error("Error checking installation:", error);
  //         })
  //         .finally(() => {
  //           setIsLoading(false);
  //         });

  //     }


    
  // }, []);
  // if (error == true) {
  //   return <ErrorPage />;
  // }

  // if(accessToken == ""){
  //   return <ErrorPage />;
  // }
  // if (isLoading) {
  //   // Optionally render a loader while waiting for the shop check
  //   return <div>Loading...</div>;
  // }

  // if (firstTime == false && isInstalled == false) {
  //   return <ErrorPage />;
  // }



  return (
    <Provider config={config}>
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
  </Provider>
   
  );
}

export default App;



