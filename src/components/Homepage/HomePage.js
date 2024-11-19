import logo from '../../logo.svg';
import '../../App.css';
import React, { Fragment } from "react"
import axios from "axios"
import ErrorPage from '../ErrorPage';





function HomePage({isInstalled,isLoading}) {
  const [data, setData] = React.useState("")


React.useEffect( () => {

const fetchData = async ()=>{
  try {
    const response = await axios.get(
      "https://smart-tailor.onrender.com", // URL of your Django API
      // { shop: shopDomain }, // Send shop as JSON body
      // { headers: { "Content-Type": "application/json" }} // Ensure JSON header
    );

    setData(response.data);
  } catch (error) {
    console.error("API call failed:", error.response?.data || error.message);
  }
}

fetchData()

  },[data])

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