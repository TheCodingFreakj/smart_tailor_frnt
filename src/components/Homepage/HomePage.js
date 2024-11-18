import logo from '../../logo.svg';
import '../../App.css';
import React, { Fragment } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom';



function HomePage({isInstalled,isLoading,firstTime}) {
  const [data, setData] = React.useState("")
  React.useEffect(() => {

    axios.get('https://smart-tailor.onrender.com').then(response => {
      console.log(response)
      setData(response.data);
    }, [isInstalled]);
  })


  const navigate = useNavigate();

  React.useEffect(() => {
      // Retrieve 'shop' from the current query string or another source
      const params = new URLSearchParams(window.location.search);
      const shop = params.get('shop') || "example.myshopify.com"; // Replace with a default or fallback shop

      // Append `?shop={shop}` to the URL if it's missing
      if (!params.has('shop')) {
          navigate(`/dashboard?shop=${shop}`, { replace: true });
      }
  }, [navigate]);
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