require('dotenv').config()
const axios = require("axios");
const converter = require('json-2-csv');
const fs = require('fs');

(async () => {

  // Current game to search for
  const ticker = "BTC_USDT"

  const url = `https://futures.mexc.com/api/v1/contract/kline/${ticker}?interval=Min5`
    
  let resp = []
  await axios.get(url)
  .then((response) => {
    resp = response.data
  }).catch((error) => {
    console.error("Error retrieving events: ", error)
  });

  
  // for () {
  //   const timestamp = 1301090400;
  // const date = new Date(timestamp * 1000);
  // }
})();