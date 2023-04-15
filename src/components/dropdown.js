import React, { Component } from "react";
// https://restcountries.com/v3.1/all?fields=name,currencies

// https://v6.exchangerate-api.com/v6/080ff539a713154eccfbfd71/latest/USD

export default class Dropdown extends Component {
  state = {
    loading: false,
    countries: this.props.countries
  };

//   makeList = e => {
//     e.preventDefault();
//     this.setState({ loading: true });

//   }

  render() {
    async function fetchCountries(endpoint) {
        // this.setState({ loading: true });
        const res = await fetch(endpoint);
        const data = await res.json();
        return data;
    }

    fetchCountries('https://restcountries.com/v3.1/all?fields=name,currencies')
    .then(data => {
        console.log(data);
        // this.setState({ countries: data, loading: false });
    });

    return (
      <div>
        <div className="currency__input">
            <label htmlFor="cars">Choose a currency:</label>
            <select name="currency">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="fiat">Fiat</option>
                <option value="audi">Audi</option>
            </select>
        </div>  
      </div>
    );
  }
}
