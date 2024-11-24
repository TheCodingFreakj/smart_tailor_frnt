import logo from '../../logo.svg';
import '../../App.css';
import React, { Fragment } from "react"
import axios from "axios"
import ErrorPage from '../ErrorPage';
import { useParams } from 'react-router-dom';
import InstallTrackingScriptButton from '../../utils/InstallTrackingScriptButton';
import ScriptRemovalButton from '../../utils/ScriptRemovalButton';



function HomePage({ isInstalled, isLoading, setIsLoading }) {
  const [data, setData] = React.useState("")


  const getCsrfToken = async () => {
    try {
      const response = await axios.get("https://smart-tailor.onrender.com/csrf/", {
        withCredentials: true, // Ensure cookies are sent
      });
      console.log("CSRF Token:", response.data.csrfToken);
      setIsLoading(false)
      return response.data.csrfToken;
    } catch (error) {
      setIsLoading(true)
      console.error("Error fetching CSRF token:", error);
    }
  };

  React.useEffect(() => {

    const fetchData = async (shopId) => {
      // const csrfToken = await getCsrfToken();
      // "X-CSRFToken": csrfToken 

      try {
        const response = await axios.post(
          "https://smart-tailor.onrender.com/dashboard/", // URL of your Django API
          { shopId: shopId }, // Send shop as JSON body
          { headers: { "Content-Type": "application/json" } } // Ensure JSON header
        );
        setIsLoading(false)
        setData(response.data.shop_details.shop);
      } catch (error) {
        setIsLoading(true)
        console.error("API call failed:", error.response?.data || error.message);
      }
    }

    fetchData(localStorage.getItem("shopParams"))

  }, [])

  if (isLoading == true) {
    return <ErrorPage />;
  }

  return (
    <Fragment>
      {/* //Create the layout here */}
      <InstallTrackingScriptButton/>

      <ScriptRemovalButton/>

    </Fragment>


  );
}

export default HomePage;