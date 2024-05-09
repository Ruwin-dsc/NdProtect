const Discord = require("discord.js");
const config = require('../../config.json')
module.exports = {
  name: "messageDeleteBulk",
  async execute(messages, channel, bot) {    
    bot.db.query(`SELECT * FROM logs WHERE guildId = "${channel.guild.id}"`, async (err, req) => {
        if(req.length < 1) return
        const action = await channel.guild.fetchAuditLogs({ limit: 1, type: Discord.AuditLogEvent.MessageBulkDelete }).then(audit => audit.entries.first());
        if (!action || action.executor.id === channel.guild.ownerId) return;
    
        const embed = new Discord.EmbedBuilder()
        .setDescription(`**${messages.size} messages** ont été supprimés dans le salon ⁠${channel}`)
        .setFooter({ text: `ID de l'utilisateur : ${action.executor.id}`})
        .setTitle("Suppression d'un ensemble de messages")
        .setThumbnail(action.executor.displayAvatarURL({ dynamic: true }))
        .setAuthor({ name: action.executor.tag, iconURL: action.executor.displayAvatarURL({ dynamic: true }), url: "https://discord.gg/3PA53mfwSv" })
        .setColor("Orange")
        .setTimestamp()
        .addFields(
            { name: "Modérateur :", value: `> ${action.executor} \`${action.executor.tag}\``},
        )
        const channel2 = channel.guild.channels.cache.get(req[0].channelMods)
        if(channel2) channel2.send({ embeds: [embed]})
    })
  }
}