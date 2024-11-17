import logo from './logo.svg';
import './App.css';
import React, { Fragment } from "react"
import axios from "axios"


function App() {
  const [data, setData] = React.useState("")
  React.useEffect(() => {

    axios.get('https://smart-tailor.onrender.com').then(response => {
      console.log(response)
      setData(response.data);
    }, []);
  })
  return (
  <Fragment>

      {/* Example App Bridge Component */}
      <TitleBar title="My Shopify App" />
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

  </Fragment>

   
  );
}

export default App;

