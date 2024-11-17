import logo from './logo.svg';
import './App.css';
import React from "react"
import axios from "axios"


import { AppProvider } from '@shopify/app-bridge-react';
function getShopFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('shop');  // This retrieves the value of the 'shop' parameter
}

const shop = getShopFromUrl();
console.log(shop)
const config = {
  apiKey: '1e49496f044a9cc3a5b89a5e12a3b493',
  shopOrigin: shop, // Pass shop name dynamically
  forceRedirect: true,
};

function App() {

  const [data, setData] = React.useState("")
  React.useEffect(() => {

    axios.get('https://smart-tailor.onrender.com').then(response => {
      console.log(response)
      setData(response.data);
    }, []);
  })
  return (
    <AppProvider config={config}>
      <div className="App">
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
      </div>
    </AppProvider>
  );
}




export default App;
