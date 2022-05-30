const { Client, Intents } = require('discord.js');
const fetch = require("node-fetch")
const express = require('express');
const winston = require('winston');
const app = express();
require('dotenv').config();
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then(res => { 
      return res.json()
    })
    .then(data => {
      return data[0]["q"] + " -" + data[0]["a"]
    })
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  if (msg.author.bot) return
  
  if (msg.content === "hello") {
    msg.reply("hi")
  }

  if (msg.content === "$inspire") {
    getQuote().then(qoute => msg.channel.send(qoute))
  }
})

require('./startup/routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));

client.login(process.env.token)

