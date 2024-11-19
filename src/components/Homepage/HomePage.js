import logo from '../../logo.svg';
import '../../App.css';
import React, { Fragment } from "react"
import axios from "axios"
import ErrorPage from '../ErrorPage';





function HomePage({isInstalled,isLoading}) {
  const [data, setData] = React.useState("")
  React.useEffect(async () => {

    // Wrapping the fetch function
const originalFetch = window.fetch;
window.fetch = async function (...args) {
  console.log('Fetch URL:', args[0]);
  const response = await originalFetch.apply(this, args);
  console.log(response)
};

    try {
      const response = await axios.post(
        "https://smart-tailor.onrender.com", // URL of your Django API
        // { shop: shopDomain }, // Send shop as JSON body
        // { headers: { "Content-Type": "application/json" }} // Ensure JSON header
      );
  
      setData(response.data);
    } catch (error) {
      console.error("API call failed:", error.response?.data || error.message);
    }

  })

  return (
  <Fragment>
    {isLoading ? <div>...Loading</div> :  <div className="App">
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
            {data}
          </a>
        </header>
      </div>}
     

  </Fragment>

   
  );
}

export default HomePage;