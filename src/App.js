import './styles/App.css';
import { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';

function App() {
  const [currencies, setCurr] = useState([]);
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [output, setOutput] = useState(0);


  const fetchCountries = () => {
      fetch("https://v6.exchangerate-api.com/v6/aa4428a6724e9cb84df1170f/codes")
          .then((response) => response.json())
          .then((data) => {
              // console.log(data.supported_codes);
              const dataPretty = data.supported_codes.map(arr => arr.join(" - "))
              // console.log(dataPretty)
              setCurr(dataPretty);
          });
  }
  useEffect(() => {
    fetchCountries();
  }, []);

  const calculateConv = (url) => {
    fetch(url).then((response) => response.json()).then((data) => {
              console.log(data.conversion_rate);
              var rate = data.conversion_rate;
              setOutput(input * rate);
          });
  }

  function convert() {
    const fromCode = from.slice(0,3);
    const toCode = to.slice(0,3);
    console.log(fromCode, toCode);
    const url = "https://v6.exchangerate-api.com/v6/aa4428a6724e9cb84df1170f/pair/"+fromCode+"/"+toCode;
    calculateConv(url);
  }
  


  return (
    <div className="App">
      <header className="App-header">
        <h1>What's It Worth?</h1>
        <p className="subhead"><em>A simple currency converter</em></p>
      </header>
      <main>
        <div className="currency__dropdowns">
          <div className="currency_from">
            <h3>From</h3>
            <Dropdown options={currencies} 
              onChange={(e) => { setFrom(e.value) }}
              value={from} placeholder="From" 
               
            />
          </div>
          <div className="currency_to">
            <h3>To</h3>
            <Dropdown options={currencies} 
              onChange={(e) => {setTo(e.value)}} 
              value={to} placeholder="To" 
               
            /> 
          </div>
          
          
        </div>
        <div className="currency__input">
          <h3>Amount to Convert</h3>
          
            <input type="text" 
             placeholder="Enter the amount" 
             onChange={(e) => setInput(e.target.value)} />
            <button onClick={()=>{convert()}}>Convert</button>
          
        </div>
        <div className="result">
          <h3>Result</h3>
          <p className="result_input">{input+" "+from}</p>
          <p className="result_equals">=</p>
          <p className="result_output">{output.toFixed(2) + " " + to}</p>
        </div>
      </main>
      <footer className="footer">
        <p>Made by Laura Brennan using create-react-app and react-dropdown</p>
        <p>Created with thanks to <a href="https://www.geeksforgeeks.org/how-to-create-a-currency-converter-app-in-reactjs/" target="_blank">this GeeksforGeeks article</a> for the inspiration and insight</p>
      </footer>
    </div>
  );
}

        
export default App;
