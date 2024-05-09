const Discord = require('discord.js')

module.exports = {
  name: "roleUpdate",
  async execute(channel, channel2, bot) {
      bot.db.query(`SELECT * FROM antiraid WHERE guildId = "${channel.guild.id}"`, async (err, req) => {
        if (err || req.length < 1 || req[0].antirole == "off") return;;

    })
  }
}