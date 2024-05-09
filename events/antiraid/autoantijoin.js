const Discord = require('discord.js')
const joins = new Map()
const ms = require("ms")
module.exports = {
  name: "guildMemberAdd",
  async execute(member, bot) {
    bot.db.query(`SELECT * FROM bot WHERE guildId = "${member.guild.id}"`, async (err, req) => {
      const whitelist = JSON.parse(req[0].whitelist)
      bot.db.query(`SELECT * FROM antiraid WHERE guildId = "${member.guild.id}"`, async (err, req) => {
          if (err || req.length < 1 || req[0].antijoin == "off") return;
          const antijoinlimite = req[0].antijoinlimite
        
          const data = joins.get(member.guild.id) || 0
          joins.set(member.guild.id, data + 1);
          if(data >= antijoinlimite) {
            member.guild.disableInvites(true)
            bot.db.query(`UPDATE bot SET raidmode = "on" WHERE guildId = ${member.guild.id}`);
          }
      })
      setTimeout(() => {
        joins.delete(member.guild.id);
      }, ms('5s'))
  })
  }
}