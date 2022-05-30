const { Client, Intents } = require('discord.js');
const fetch = require("node-fetch")

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

client.login("OTc5NjU4Mzc0Mzc3NTA0ODQ4.GZPo4r.vDOoUrgl9YC5iBbbSfdvKoFxETZLjAl-8g2y5s")

