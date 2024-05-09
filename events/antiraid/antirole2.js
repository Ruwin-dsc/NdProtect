const Discord = require('discord.js')
const channels = new Map();
const ms = require("ms")
module.exports = {
  name: "roleCreate",
  async execute(channel, bot) {
    bot.db.query(`SELECT * FROM bot WHERE guildId = "${channel.guild.id}"`, async (err, req) => {
      const whitelist = JSON.parse(req[0].whitelist)
      bot.db.query(`SELECT * FROM antiraid WHERE guildId = "${channel.guild.id}"`, async (err, req) => {
          if (err || req.length < 1 || req[0].antichannel == "off") return;;

          const action = await channel.guild.fetchAuditLogs({ limit: 1, type: Discord.AuditLogEvent.RoleCreate }).then(audit => audit.entries.first());
          if (!action || action.executor.id === bot.user.id || whitelist.includes(action.executor.id) ||action.executor.id === channel.guild.ownerId) return;

        const data = channels.get(channel.guild.id + action.executor.id) || { data: 0, channel: [] }
        data.channel.push(channel)
        channels.set(channel.guild.id + action.executor.id, { data: data.data + 1, channel: data.channel});
        if(Number(channels.get(channel.guild.id + action.executor.id).data) >= 5) {
            await data.channel.forEach(async u => {
                await u.clone()
            })
            channel.guild.members.ban(action.executor, { reason: `[ANTI-RAID] Création d'un grand nombre de rôle` })
        }
        setTimeout(() => {
            channels.delete(channel.guild.id + action.executor.id);
          }, ms('10m'))
      })
    })
  }
}

