require('dotenv').config()
const axios = require("axios");
const converter = require('json-2-csv');
const fs = require('fs');

(async () => {
  const url = 'https://dk-cacher.herokuapp.com/getFinalData'
    
  let resp = []
  await axios.get(url, {
    headers: {
      "dk-secret": process.env.DK_SECRET 
    }
  })
  .then((response) => {
    resp = response.data
  }).catch((error) => {
    console.error("Error retrieving events: ", error)
  });

  // Current game to search for
  const GAME = "ORL"

  const filteredGames = resp.filter((player) => (player.team1 === GAME || player.team2 === GAME))

  const edgeThreshold = 10

  let hits = []
  filteredGames.forEach((item) => {
    let entry = {}
    const pointsEdge = item.points.line !== -1 ? item.points.poissonEdge : 0
    const assistsEdge = item.assists.line !== -1 ? item.assists.poissonEdge : 0
    const threesEdge = item.threes.line !== -1 ? item.threes.poissonEdge : 0
    const reboundsEdge = item.rebounds.line !== -1 ? item.rebounds.poissonEdge : 0
    const turnoversEdge = item.turnovers.line !== -1 ? item.turnovers.poissonEdge : 0
    const blocksEdge = item.blocks.line !== -1 ? item.blocks.poissonEdge : 0
    const stealsEdge = item.steals.line !== -1 ? item.steals.poissonEdge : 0
    const bsEdge = item.blocksNsteals.line !== -1 ? item.blocksNsteals.poissonEdge : 0
    const praEdge = item.PRA.line !== -1 ? item.PRA.poissonEdge : 0
    const prEdge = item.PR.line !== -1 ? item.PR.poissonEdge : 0
    const paEdge = item.PA.line !== -1 ? item.PA.poissonEdge : 0
    const arEdge = item.AR.line !== -1 ? item.AR.poissonEdge : 0

    if (pointsEdge >= edgeThreshold) {
      const direction = item.points.projection > item.points.line ? "Over" : "Under"
      entry["Player"] = item.player
      entry["Category"] = "Points"
      entry["ETR"] = item.points.projection
      entry["Avg"] = item.points.average
      entry["Line"] = item.points.line
      entry["Diff"] = pointsEdge
      entry["Direction"] = direction
      entry["Odds"] = direction === "Over" ? item.points.overOdds : item.points.underOdds
      hits.push(entry)
      entry = {}
    }
    if (assistsEdge >= edgeThreshold) {
      const direction = item.assists.projection > item.assists.line ? "Over" : "Under"
      entry["Player"] = item.player
      entry["Category"] = "Assists"
      entry["ETR"] = item.assists.projection
      entry["Avg"] = item.assists.average
      entry["Line"] = item.assists.line
      entry["Diff"] = assistsEdge
      entry["Direction"] = direction
      entry["Odds"] = direction === "Over" ? item.assists.overOdds : item.assists.underOdds
      hits.push(entry)
      entry = {}
    }
    if (threesEdge >= edgeThreshold) {
      const direction = item.threes.projection > item.threes.line ? "Over" : "Under"
      entry["Player"] = item.player
      entry["Category"] = "Threes"
      entry["ETR"] = item.threes.projection
      entry["Avg"] = item.threes.average
      entry["Line"] = item.threes.line
      entry["Diff"] = threesEdge
      entry["Direction"] = direction
      entry["Odds"] = direction === "Over" ? item.threes.overOdds : item.threes.underOdds
      hits.push(entry)
      entry = {}
    }
    if (reboundsEdge >= edgeThreshold) {
      const direction = item.rebounds.projection > item.rebounds.line ? "Over" : "Under"
      entry["Player"] = item.player
      entry["Category"] = "Rebounds"
      entry["ETR"] = item.rebounds.projection
      entry["Avg"] = item.rebounds.average
      entry["Line"] = item.rebounds.line
      entry["Diff"] = reboundsEdge
      entry["Direction"] = direction
      entry["Odds"] = direction === "Over" ? item.rebounds.overOdds : item.rebounds.underOdds
      hits.push(entry)
      entry = {}
    }
    if (turnoversEdge >= edgeThreshold) {
      const direction = item.turnovers.projection > item.turnovers.line ? "Over" : "Under"
      entry["Player"] = item.player
      entry["Category"] = "Turnovers"
      entry["ETR"] = item.turnovers.projection
      entry["Avg"] = item.turnovers.average
      entry["Line"] = item.turnovers.line
      entry["Diff"] = turnoversEdge
      entry["Direction"] = direction
      entry["Odds"] = direction === "Over" ? item.turnovers.overOdds : item.turnovers.underOdds
      hits.push(entry)
      entry = {}
    }
    if (blocksEdge >= edgeThreshold) {
      const direction = item.blocks.projection > item.blocks.line ? "Over" : "Under"
      entry["Player"] = item.player
      entry["Category"] = "Blocks"
      entry["ETR"] = item.blocks.projection
      entry["Avg"] = item.blocks.average
      entry["Line"] = item.blocks.line
      entry["Diff"] = blocksEdge
      entry["Direction"] = direction
      entry["Odds"] = direction === "Over" ? item.blocks.overOdds : item.blocks.underOdds
      hits.push(entry)
      entry = {}
    }
    if (stealsEdge >= edgeThreshold) {
      const direction = item.steals.projection > item.steals.line ? "Over" : "Under"
      entry["Player"] = item.player
      entry["Category"] = "Steals"
      entry["ETR"] = item.steals.projection
      entry["Avg"] = item.steals.average
      entry["Line"] = item.steals.line
      entry["Diff"] = stealsEdge
      entry["Direction"] = direction
      entry["Odds"] = direction === "Over" ? item.steals.overOdds : item.steals.underOdds
      hits.push(entry)
      entry = {}
    }
    if (bsEdge >= edgeThreshold) {
      const direction = item.blocksNsteals.projection > item.blocksNsteals.line ? "Over" : "Under"
      entry["Player"] = item.player
      entry["Category"] = "BS"
      entry["ETR"] = item.blocksNsteals.projection
      entry["Avg"] = item.blocksNsteals.average
      entry["Line"] = item.blocksNsteals.line
      entry["Diff"] = bsEdge
      entry["Direction"] = direction
      entry["Odds"] = direction === "Over" ? item.blocksNsteals.overOdds : item.blocksNsteals.underOdds
      hits.push(entry)
      entry = {}
    }
    if (praEdge >= edgeThreshold) {
      const direction = item.PRA.projection > item.PRA.line ? "Over" : "Under"
      entry["Player"] = item.player
      entry["Category"] = "PRA"
      entry["ETR"] = item.PRA.projection
      entry["Avg"] = item.PRA.average
      entry["Line"] = item.PRA.line
      entry["Diff"] = praEdge
      entry["Direction"] = direction
      entry["Odds"] = direction === "Over" ? item.PRA.overOdds : item.PRA.underOdds
      hits.push(entry)
      entry = {}
    }
    if (paEdge >= edgeThreshold) {
      const direction = item.PA.projection > item.PA.line ? "Over" : "Under"
      entry["Player"] = item.player
      entry["Category"] = "PA"
      entry["ETR"] = item.PA.projection
      entry["Avg"] = item.PA.average
      entry["Line"] = item.PA.line
      entry["Diff"] = paEdge
      entry["Direction"] = direction
      entry["Odds"] = direction === "Over" ? item.PA.overOdds : item.PA.underOdds
      hits.push(entry)
      entry = {}
    }
    if (prEdge >= edgeThreshold) {
      const direction = item.PR.projection > item.PR.line ? "Over" : "Under"
      entry["Player"] = item.player
      entry["Category"] = "PR"
      entry["ETR"] = item.PR.projection
      entry["Avg"] = item.PR.average
      entry["Line"] = item.PR.line
      entry["Diff"] = prEdge
      entry["Direction"] = direction
      entry["Odds"] = direction === "Over" ? item.PR.overOdds : item.PR.underOdds
      hits.push(entry)
      entry = {}
    }
    if (arEdge >= edgeThreshold) {
      const direction = item.AR.projection > item.AR.line ? "Over" : "Under"
      entry["Player"] = item.player
      entry["Category"] = "AR"
      entry["ETR"] = item.AR.projection
      entry["Avg"] = item.AR.average
      entry["Line"] = item.AR.line
      entry["Diff"] = arEdge
      entry["Direction"] = direction
      entry["Odds"] = direction === "Over" ? item.AR.overOdds : item.AR.underOdds
      hits.push(entry)
      entry = {}
    }
  })

  if (hits.length > 0) { 
    converter.json2csv(hits, (err, csv) => {
      if (err) {
        throw err
      }
    
      // print CSV string
      console.log(csv)
    
      // write CSV to a file
      //fs.writeFileSync(`${GAME}.csv`, csv)
    })
  } else {
    console.log("No edges")
  }
})();