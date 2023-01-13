import Swal from 'sweetalert2';

// capturando elementos do HTML
const searchButton = document.querySelector('#search-button');
const currencyInput = document.querySelector('#currency-input');
const container = document.querySelector('.container')
const titleCurrency = document.querySelector('#title-board');

searchButton.addEventListener('click', () => {
  container.innerHTML = '';
  if (currencyInput.value === '') {
    return Swal.fire({
      icon: 'error',
      title: 'Ops...',
      text: 'Você precisa passar uma moeda'
    })
  }
  
fetch(`https://api.exchangerate.host/latest?base=${currencyInput.value}`)
  .then((response) => response.json())
  .then((currencies) => {
    const currenciesSymbols = Object.keys(currencies.rates);
    const currenciesValues = Object.values(currencies.rates);
    if (!currencyInput.value.includes(currenciesValues)) {
      return Swal.fire({
        icon: 'error',
        title: 'Ops...',
        text: 'Moeda não existente!'
      })
    }
    currenciesSymbols.forEach((symbol, index) => {
      const currencyDiv = document.createElement('div');
      currencyDiv.classList.add('currencies')
      const currency = document.createElement('p')
      const currencyValues = document.createElement('span')
      currency.innerHTML = symbol;
      currency.classList.add('currency-symbol')
      currencyValues.innerHTML = currenciesValues[index];
      currencyValues.classList.add('currency-value');
      currencyDiv.appendChild(currency);
      currencyDiv.appendChild(currencyValues);
      container.appendChild(currencyDiv);
    });
  });
})


// button.eventlistener() => fetch() => Object.keys(fetch forEach())