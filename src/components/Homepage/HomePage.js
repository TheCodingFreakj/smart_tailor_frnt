import logo from '../../logo.svg';
import '../../App.css';
import React, { Fragment } from "react"
import axios from "axios"
import ErrorPage from '../ErrorPage';
import { useParams } from 'react-router-dom';




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

        setData(response.data.shop_details.shop);
      } catch (error) {
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
      {<div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.name}
            {data.email}
          </a>
        </header>
      </div>}


    </Fragment>


  );
}

export default HomePage;