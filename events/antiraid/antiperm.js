const Discord = require('discord.js')

module.exports = {
  name: "roleUpdate",
  async execute(channel, channel2, bot) {
      bot.db.query(`SELECT * FROM antiraid WHERE guildId = "${channel.guild.id}"`, async (err, req) => {
        if (err || req.length < 1 || req[0].antirole == "off") return;;

        if(channel2.permissions.has(Discord.PermissionFlagsBits.Administrator) || channel2.permissions.has(Discord.PermissionFlagsBits.ManageRoles) || channel2.permissions.has(Discord.PermissionFlagsBits.ManageChannels) || channel2.permissions.has(Discord.PermissionFlagsBits.ManageGuild) || channel2.permissions.has(Discord.PermissionFlagsBits.ManageMessages) || channel2.permissions.has(Discord.PermissionFlagsBits.ManageWebhooks) || channel2.permissions.has(Discord.PermissionFlagsBits.ManageRoles) || channel2.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
          channel2.edit({ permissions: channel.permissions })
        }
    })
  }
}