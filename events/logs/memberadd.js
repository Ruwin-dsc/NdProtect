const Discord = require("discord.js");
const config = require('../../config.json')
module.exports = {
  name: "guildMemberAdd",
  async execute(member, bot) {
    bot.db.query(`SELECT * FROM logs WHERE guildId = "${member.guild.id}"`, async (err, req) => {
    if(req.length < 1) return

    const embed = new Discord.EmbedBuilder()
    .setDescription(`${member} a rejoint le serveur.`)
    .setFooter({ text: `ID de l'utilisateur : ${member.user.id}`})
    .setTitle("Arrivée d'un membre")
    .setThumbnail(member.displayAvatarURL({ dynamic: true }))
    .setAuthor({ name: `@${member.user.username}`, iconURL: member.user.displayAvatarURL({ dynamic: true }), url: "https://discord.gg/3PA53mfwSv" })
    .setColor("Green")
    .setTimestamp()
    .addFields(
        { name: "Date de création du compte :", value: `> <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)` }
    )
    const channel = member.guild.channels.cache.get(req[0].channelMember)
    if(channel) channel.send({ embeds: [embed]})
})
  }
}
