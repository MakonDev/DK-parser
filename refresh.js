require('dotenv').config()
const scratch = require("./scratch.js")

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

setInterval(async () => {
  const date = new Date();
  console.log(`Current hour: ${date.getHours()}`)
  if (date.getHours() >= 17 && date.getHours() <= 23) {  
    const delay = Math.floor(Math.random() * (900000 - 10000 + 1)) + 10000;
    console.log(`Delaying ${delay/1000/60} Minutes`)
    await sleep(delay)
    await scratch.search()
    console.log("Done syncing latest tokens")
  } else {
    console.log("Not the right time of day!")
  }
}, 1800000);