const Discord = require("discord.js");
const config = require('../../config.json')
module.exports = {
  name: "messageCreate",
  execute(message, bot) {
    if(!message.guild) return
    if(message.author.bot) return
    bot.db.query(`SELECT * FROM utilitaire WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        if(req.length < 1 || req[0].boost == "off") return

        const channel = message.guild.channels.cache.get(req[0].channelboost)
        if(channel && message.channel.id == channel.id) message.react(bot.emoji.boost)

    })
  }
}