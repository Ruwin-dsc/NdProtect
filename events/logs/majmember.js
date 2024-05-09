const Discord = require("discord.js");
const config = require('../../config.json')
module.exports = {
  name: "guildMemberUpdate",
  async execute(member, member2, bot) {
    let check = false
    bot.db.query(`SELECT * FROM logs WHERE guildId = "${member.guild.id}"`, async (err, req) => {
    if(req.length < 1) return

    const addedRoles = member2.roles.cache.filter(role => !member.roles.cache.has(role.id));
    const removedRoles = member.roles.cache.filter(role => !member2.roles.cache.has(role.id));
    const embed = new Discord.EmbedBuilder()
    .setDescription(`${member} a été mis à jour.`)
    .setFooter({ text: `ID de l'utilisateur : ${member.user.id}`})
    .setTitle("Mise à jour d'un membre")
    .setThumbnail(member.displayAvatarURL({ dynamic: true }))
    .setAuthor({ name: `@${member.user.username}`, iconURL: member.user.displayAvatarURL({ dynamic: true }), url: "https://discord.gg/3PA53mfwSv" })
    .setColor("Blurple")
    .setTimestamp()
    if(addedRoles.size !== 0) embed.addFields({ name: "Role ajoutés :", value: `> ${addedRoles.map(role => `${role}`).join(", ")}` })
    else if(removedRoles.size !== 0)  embed.addFields({ name: "Role retirés :", value: `> ${removedRoles.map(role => `${role}`).join(", ")}` })
    else return
    const channel = member.guild.channels.cache.get(req[0].channelMember)
    if(channel) await channel.send({ embeds: [embed]})
})
  }
}
