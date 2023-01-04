const axios = require("axios")
const puppeteer = require('puppeteer');

const searchForETRProjections = async () => {
  console.log("Starting a search!")
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://establishtherun.com/wp-login.php?redirect_to=%2F')
  await page.waitForTimeout(10000)
  await page.type('input[name=log]', 'nick.sadler')
  await page.type('input[name=pwd]', 'NickSadler11$')
  await page.click('input[name=wp-submit]')
  await page.waitForTimeout(10000)
  await page.goto('https://establishtherun.com/daily-nba-full-statistical-projections/');
  await page.waitForTimeout(10000)
  const data = await page.evaluate(() => {
    const tds = Array.from(document.querySelectorAll('table tr td'))
    return tds.map(td => td.innerText)
  });
  //console.log(data)
  let chunkedData = []
  const chunkSize = 11;
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    let dataObject = {
      player: chunk[0].trim(),
      team1: chunk[1].trim(),
      team2: chunk[2].trim(),
      minutes: Number(chunk[3]).toFixed(2),
      points: Number(chunk[4]).toFixed(2),
      assists: Number(chunk[5]).toFixed(2),
      rebounds: Number(chunk[6]).toFixed(2),
      turnovers: Number(chunk[7]).toFixed(2),
      threes: Number(chunk[8]).toFixed(2),
      steals: Number(chunk[9]).toFixed(2),
      blocks: Number(chunk[10]).toFixed(2),
      stealsNblocks: Number(chunk[9])+Number(chunk[10]).toFixed(2),
      PRA: Number(chunk[4])+Number(chunk[5])+Number(chunk[6]).toFixed(2),
      PR: Number(chunk[4])+Number(chunk[5]).toFixed(2),
      PA: Number(chunk[4])+Number(chunk[6]).toFixed(2),
      AR: Number(chunk[5])+Number(chunk[6]).toFixed(2),
    }
    chunkedData.push(dataObject)
  }
  console.log(chunkedData.length)
  //await page.screenshot({path: 'screenshot.png', fullPage: true});
  browser.close();
  return chunkedData
}

module.exports = {
  search: async function() {
    const chunkedETRData = await searchForETRProjections()

    let options = {
      method: 'POST',
      url: 'https://dk-cacher.herokuapp.com/acceptETR',
      headers: {
        'dk-secret': "BlahBlaapBlee879$&"
      },
      data: {
        chunkedETRData
      }
    }
    await axios.request(options).then(() => {
      console.log("Successful response!")
    }).catch((error) => {
      console.error("Unable to send ETR stuff: ", error);
    });

    console.log("Done!")

    return chunkedETRData
  }
}

