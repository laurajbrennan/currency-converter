import React, { Component } from "react";
// import { createRoot } from 'react-dom/client';
// https://restcountries.com/v3.1/all?fields=name,currencies

// https://v6.exchangerate-api.com/v6/080ff539a713154eccfbfd71/latest/USD

export default class Dropdown extends Component {
  render() {
    async function fetchCountries(endpoint) {
        const res = await fetch(endpoint);
        const data = await res.json();
        return data;
    };
    function makeList(array) {
        array.map(entry => {
            const currCode = entry[0];
            const currName = entry[1];
            return (
                <option value={currCode}>{currCode} - {currName}</option>
            )
        })
    };
    // function makeList(array){
    //     array.forEach((currency) => {
    //         console.log(currency);
    //         const currCode = currency[0];
    //         const currName = currency[1];
    //         const option = React.createElement("option", null, {currCode} - {currName});
    //         addToPage(option);
    //     })
    // }
    function start() {
        fetchCountries('https://v6.exchangerate-api.com/v6/080ff539a713154eccfbfd71/codes').then(data => {
        // console.log(data.supported_codes);
        makeList(data.supported_codes);
    });
    }

    return (
      <div>
        <div className="currency__input">
            <label htmlFor="cars">Choose a currency:</label>
            <select name="currency" id="currency__select">
                <option value="">Choose your currency</option>
                
            </select>
        </div>  
      </div>
    );
  }
}
