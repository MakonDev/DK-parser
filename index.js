const helper = require("./helper.js")
const express = require('express')

const app = express();
app.use(express.json());
app.use(express.json({limit: '10mb'}))

app.get("/ping", async(req, res) => {
  const stuff = await helper.search()
  res.status(200).json(stuff)
})

const port = process.env.PORT || 8081;
app.listen(port);

console.log(`DraftKings Prop data listening on ${port}`);