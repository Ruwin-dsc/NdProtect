const Discord = require('discord.js')

module.exports = {
  name: "guildUpdate",
  async execute(member, newGuild, bot) {
    if(member.name == newGuild.name && member.iconURL({ dynamic: true }) == newGuild.iconURL({ dynamic: true })) return
    bot.db.query(`SELECT * FROM bot WHERE guildId = "${member.id}"`, async (err, req) => {
      const whitelist = JSON.parse(req[0].whitelist)
      bot.db.query(`SELECT * FROM antiraid WHERE guildId = "${member.id}"`, async (err, req) => {
          if (err || req.length < 1 || req[0].antibot == "off") return;;

          const action = await member.fetchAuditLogs({ limit: 1, type: Discord.AuditLogEvent.GuildUpdate }).then(audit => audit.entries.first());
          if (!action || action.executor.id === bot.user.id || whitelist.includes(action.executor.id) ||action.executor.id === member.ownerId) return;

          newGuild.setName(member.name)
          newGuild.setIcon(member.iconURL({ dynamic: true }))
          
          action.executor.send(`:warning: Vous n'êtes pas autorisé à modifier l'apparence du serveur \`${member.name}\`.`)

      })
  })
  }
}