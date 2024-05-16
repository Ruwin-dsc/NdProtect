const Discord = require('discord.js')

module.exports = {
  name: "roleUpdate",
  async execute(channel, channel2, bot) {
    bot.db.query(`SELECT * FROM bot WHERE guildId = "${channel2.guild.id}"`, async (err, req) => {
      const whitelist = JSON.parse(req[0].whitelist)
      bot.db.query(`SELECT * FROM antiraid WHERE guildId = "${channel.guild.id}"`, async (err, req) => {
        if (err || req.length < 1 || req[0].antiperm == "off") return;;

        const action = await member.guild.fetchAuditLogs({ limit: 1, type: Discord.AuditLogEvent.RoleUpdate }).then(audit => audit.entries.first());
          if (!action || action.executor.id === bot.user.id || whitelist.includes(action.executor.id)) return;

        if(channel2.permissions.has(Discord.PermissionFlagsBits.Administrator) || channel2.permissions.has(Discord.PermissionFlagsBits.ManageRoles) || channel2.permissions.has(Discord.PermissionFlagsBits.ManageChannels) || channel2.permissions.has(Discord.PermissionFlagsBits.ManageGuild) || channel2.permissions.has(Discord.PermissionFlagsBits.ManageMessages) || channel2.permissions.has(Discord.PermissionFlagsBits.ManageWebhooks) || channel2.permissions.has(Discord.PermissionFlagsBits.ManageRoles) || channel2.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
          channel2.edit({ permissions: channel.permissions })
        }
    })
  })
}}