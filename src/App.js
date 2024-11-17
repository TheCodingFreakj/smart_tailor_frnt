import logo from './logo.svg';
import './App.css';
import React from "react"
import axios from "axios"

function App() {
const [data, setData] = React.useState("")

axios.get('https://smarttailor.onrender.com').then(response => {
    setData(response.data);
});
  return (
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
  );
}

export default App;
