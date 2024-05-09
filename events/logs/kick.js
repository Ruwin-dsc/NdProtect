const Discord = require("discord.js");
const config = require('../../config.json')
module.exports = {
  name: "guildMemberRemove",
  async execute(member, bot) {
    bot.db.query(`SELECT * FROM logs WHERE guildId = "${member.guild.id}"`, async (err, req) => {
    if(req.length < 1) return

    const action = await member.guild.fetchAuditLogs({ limit: 1, type: Discord.AuditLogEvent.MemberKick }).then(audit => audit.entries.first());
    if (!action || action.executor.id === bot.user.id || action.executor.id === member.guild.ownerId) return;

    if (action.createdAt < member.joinedAt) return
    const embed = new Discord.EmbedBuilder()
    .setDescription(`${member} a été expulsé du serveur.`)
    .setFooter({ text: `ID de l'utilisateur : ${member.user.id}`})
    .setTitle("Expulsion")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setAuthor({ name: `@${member.user.username}`, iconURL: member.user.displayAvatarURL({ dynamic: true }), url: "https://discord.gg/3PA53mfwSv" })
    .setColor("Red")
    .setTimestamp()
    .addFields(
        { name: "Modérateur :", value: `> ${action.executor} **@${action.executor.username}**`},
        { name: "Raison :", value: `> ${member.reason ? member.reason : "Aucune raison fournie"}`},
    )
    const channel = member.guild.channels.cache.get(req[0].channelMods)
    if(channel) channel.send({ embeds: [embed]})
})
  }
}
