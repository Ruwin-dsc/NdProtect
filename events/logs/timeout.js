const Discord = require("discord.js");
const config = require('../../config.json')
module.exports = {
  name: "guildMemberUpdate",
  async execute(member, newMember, bot) {
    if (member.communicationDisabledUntilTimestamp !== newMember.communicationDisabledUntilTimestamp) {
    bot.db.query(`SELECT * FROM logs WHERE guildId = "${member.guild.id}"`, async (err, req) => {
    if(req.length < 1) return

    const action = await member.guild.fetchAuditLogs({ limit: 1, type: Discord.AuditLogEvent.MemberUpdate }).then(audit => audit.entries.first());
    if (!action || action.executor.id === bot.user.id || action.executor.id === member.guild.ownerId) return;

    const embed = new Discord.EmbedBuilder()
    .setDescription(`${member} a été rendu muet sur le serveur.`)
    .setFooter({ text: `ID de l'utilisateur : ${member.user.id}`})
    .setTitle("Exclusion")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setAuthor({ name: `@${member.user.username}`, iconURL: member.user.displayAvatarURL({ dynamic: true }), url: "https://discord.gg/3PA53mfwSv" })
    .setColor("Red")
    .addFields(
        { name: "Modérateur :", value: `> ${action.executor} **@${action.executor.username}**`},
        { name: "Raison :", value: `> ${member.reason ? member.reason : "Aucune raison fournie"}`},
        { name: "Muet jusqu'au :", value: `> <t:${Math.floor(member.communicationDisabledUntilTimestamp / 1000)}:f> (<t:${Math.floor(member.communicationDisabledUntilTimestamp / 1000)}:R>)`},
    )
    const channel = member.guild.channels.cache.get(req[0].channelMods)
    if(channel) channel.send({ embeds: [embed]})
})
  } else if(!newMember.communicationDisabledUntilTimestamp && member.communicationDisabledUntilTimestamp !== newMember.communicationDisabledUntilTimestamp) {
    bot.db.query(`SELECT * FROM logs WHERE guildId = "${member.guild.id}"`, async (err, req) => {
      if(req.length < 1) return
    const action = await member.guild.fetchAuditLogs({ limit: 1, type: Discord.AuditLogEvent.MemberUpdate }).then(audit => audit.entries.first());
    if (!action || action.executor.id === bot.user.id || action.executor.id === member.guild.ownerId) return;

    const embed = new Discord.EmbedBuilder()
    .setDescription(`${member} n'est plus muet sur le serveur.`)
    .setTimestamp()
    .setFooter({ text: `ID de l'utilisateur : ${member.user.id}`})
    .setTitle("Exclusion terminée")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setAuthor({ name: `@${member.user.username}`, iconURL: member.user.displayAvatarURL({ dynamic: true }), url: "https://discord.gg/3PA53mfwSv" })
    .setColor("Green")
    .addFields(
        { name: "Modérateur :", value: `> ${action.executor} **@${action.executor.username}**`},
    )
    const channel = member.guild.channels.cache.get(req[0].channelMods)
    if(channel) channel.send({ embeds: [embed]})

    })    
  } 
}
}
