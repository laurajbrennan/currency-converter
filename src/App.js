import './styles/App.css';
import { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';

function App() {
  const [currencies, setCurr] = useState([]); //list of currencies in "XXX - Name" format
  const [input, setInput] = useState(0); //what the user types in the input box
  const [from, setFrom] = useState(""); //baseline currency
  const [to, setTo] = useState(""); //currency to convert to
  const [output, setOutput] = useState(0); //result of the currency calculation

  // calling the API for the list of currencies on page load
  const fetchCountries = () => {
      fetch("https://v6.exchangerate-api.com/v6/aa4428a6724e9cb84df1170f/codes")
          .then((response) => response.json())
          .then((data) => {
              // data is an array of arrays, so this loops through and joins each one of those arrays into a string
              const dataPretty = data.supported_codes.map(arr => arr.join(" - "))

              // once that's done, set state with the cleaned up data so that Dropdowns can populate from this source
              setCurr(dataPretty);
          });
  }
  useEffect(() => {
    fetchCountries();
  }, []);

  // declaring the API call to get the pair conversion endpoint and making the calculation
  const calculateConv = (url) => {
    fetch(url).then((response) => response.json()).then((data) => {
              // data.conversion_rate is the conversion rate, based on the "from" currency, storing that in a variable for ease of use
              var rate = data.conversion_rate;

              // set the state to contain the output amount, aka the input number multiplied by the rate
              setOutput(input * rate);
          });
  }

  // when the convert button is pressed, this function grabs the currency code from state and concatenates the URL for the API call, then calls the final calculation function
  function convert() {
    // the "from" and "to" in state are in "ABC - Name" format, so for the API call we just need the first three letters of the string
    const fromCode = from.slice(0,3);
    const toCode = to.slice(0,3);

    // now we store the URL for the API call in a variable, adding the codes from above to make the correct call 
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
