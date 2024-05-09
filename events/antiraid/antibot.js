const Discord = require('discord.js')

module.exports = {
  name: "guildMemberAdd",
  async execute(member, bot) {
    if(!member.user.bot) return
    bot.db.query(`SELECT * FROM bot WHERE guildId = "${member.guild.id}"`, async (err, req) => {
      const whitelist = JSON.parse(req[0].whitelist)
      bot.db.query(`SELECT * FROM antiraid WHERE guildId = "${member.guild.id}"`, async (err, req) => {
          if (err || req.length < 1 || req[0].antibot == "off") return;;

          const action = await member.guild.fetchAuditLogs({ limit: 1, type: Discord.AuditLogEvent.BotAdd }).then(audit => audit.entries.first());
          if (!action || action.executor.id === bot.user.id || whitelist.includes(action.executor.id) ||action.executor.id === member.guild.ownerId) return;

          member.guild.members.ban(member, { reason: `> [ANTI-RAID] Ajout d'un bot par @${action.executor.username}` })
          
          action.executor.send(`⚠️ Vous n'êtes pas autorisé à ajouter des bots sur le serveur\`${member.guild.name}\`.`)

      })
  })
  }
}