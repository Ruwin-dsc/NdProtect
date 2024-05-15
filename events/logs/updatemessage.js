const Discord = require("discord.js");
const config = require('../../config.json')
module.exports = {
  name: "messageUpdate",
  async execute(message, message2, bot) {
    if(!message.author) return
    if(message.content == message2.content) return
    if(message.author.id == bot.user.id) return
    bot.db.query(`SELECT * FROM logs WHERE guildId = "${message.guild.id}"`, async (err, req) => {
    if(req.length < 1) return

    const embed = new Discord.EmbedBuilder()
    .setDescription(`${message.author} a modifié un message.`)
    .setFooter({ text: `ID du message : ${message.id}`})
    .setTitle("Message modifié")
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setAuthor({ name: `@${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }), url: "https://discord.gg/3PA53mfwSv" })
    .setColor("Orange")
    .setTimestamp()
    .addFields(
        { name: "Salon :", value: `> ${message.channel} \`${message.channel.name}\``},
        { name: "Ancien contenu :", value: `> ${message.content}`},
        { name: "Nouveau contenu :", value: `> ${message2.content}`},
    )
    const channel = message.guild.channels.cache.get(req[0].channelMessage)
    if(channel) channel.send({ embeds: [embed]})
})
  }
}
