const Discord = require('discord.js');
const config = require('../../config.json');
const ms = require("ms")

const regexLink = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;;
const regexDiscord = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;;

module.exports = {
  name: "messageCreate", 
  async execute(message, bot) {
    if(!message.guild) return
    if(message.author.id == message.guild.ownerId) return
    if(message.content.match(regexLink)) {
    bot.db.query(`SELECT * FROM bot WHERE guildId = "${message.guild.id}"`, async (err, req) => {
    const whitelist = JSON.parse(req[0].whitelist)
    if(message.author.id == bot.user.id) return
      if(message.author.id == message.guild.ownerId) return
    if(whitelist.includes(message.author.id)) return
        bot.db.query(`SELECT * FROM antiraid WHERE guildId = "${message.guild.id}"`, async (err, req) => {
            if(req.length < 1 || req[0].antilink == "off") return
            const antilinkchannel = JSON.parse(req[0].antilinkchannel)
            if(antilinkchannel.includes(message.channel.id)) return
            message.delete()
            message.author.send(`⚠️ Vous n'êtes pas autorisé à envoyer des liens dans le salon ${message.channel}.`)
        })
    })
    } else if(message.content.match(regexDiscord)){
        bot.db.query(`SELECT * FROM bot WHERE guildId = "${message.guild.id}"`, async (err, req) => {
            const whitelist = JSON.parse(req[0].whitelist)
            if(message.author.id == bot.user.id) return
          if(message.author.id == message.guild.ownerId) return
            if(whitelist.includes(message.author.id)) return
                bot.db.query(`SELECT * FROM antiraid WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                    if(req.length < 1 || req[0].antiinvite == "off") return
                    const antilinkchannel = JSON.parse(req[0].antiinvitechannel)
                    if(antilinkchannel.includes(message.channel.id)) return
                    message.delete()
                    message.author.send(`⚠️ Vous n'êtes pas autorisé à envoyer des invitations dans le salon ${message.channel}.`)
                })
            })
    }
}}
