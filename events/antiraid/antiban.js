const Discord = require('discord.js')
const bans = new Map();
const ms = require("ms")
module.exports = {
  name: "guildBanAdd",
  async execute(member, bot) {
    if(member.user.id == bot.user.id) return
    bot.db.query(`SELECT * FROM bot WHERE guildId = "${member.guild.id}"`, async (err, req) => {
      const whitelist = JSON.parse(req[0].whitelist)
      bot.db.query(`SELECT * FROM antiraid WHERE guildId = "${member.guild.id}"`, async (err, req) => {
          if (err || req.length < 1 || req[0].antiban == "off") return;;

          const action = await member.guild.fetchAuditLogs({ limit: 1, type: Discord.AuditLogEvent.MemberBanAdd }).then(audit => audit.entries.first());
          if (!action || action.executor.id === bot.user.id || whitelist.includes(action.executor.id) ||action.executor.id === member.guild.ownerId) return;

        const data = bans.get(member.guild.id + action.executor.id) || { data: 0, user: [] }
        data.user.push(member.id)
        bans.set(member.guild.id + action.executor.id, { data: data.data + 1, user: data.user});
        if(Number(bans.get(member.guild.id + action.executor.id).data) == 5) {
            await data.user.forEach(async u => {
                await member.guild.bans.remove(u)
            })
            member.guild.members.ban(action.executor, { reason: `[ANTI-RAID] Bannissement d'un grand nombre d'utilisateur` })
        }
        setTimeout(() => {
            bans.delete(member.guild.id + action.executor.id);
          }, ms('10m'))
      })
    })
  }
}