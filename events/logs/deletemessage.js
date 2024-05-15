const Discord = require("discord.js");
const config = require('../../config.json')
module.exports = {
  name: "messageDelete",
  async execute(message, bot) {
    if(!message.author) return
    if(message.content == "") return
    if(message.author.id == bot.user.id) return
    bot.db.query(`SELECT * FROM logs WHERE guildId = "${message.guild.id}"`, async (err, req) => {
    if(req.length < 1) return

    const embed = new Discord.EmbedBuilder()
    .setDescription(`Un message de ${message.author} a été supprimé.`)
    .setFooter({ text: `ID du message : ${message.id}`})
    .setTitle("Message supprimé")
    .setThumbnail(message.author?.displayAvatarURL({ dynamic: true }))
    .setAuthor({ name: `@${message.author?.username}`, iconURL: message.author?.displayAvatarURL({ dynamic: true }), url: "https://discord.gg/3PA53mfwSv" })
    .setColor("Red")
    .setTimestamp()
    .addFields(
        { name: "Salon :", value: `> ${message.channel} \`${message.channel.name}\``},
        { name: "Contenu :", value: `> ${message.content}`},
    )
    const channel = message.guild.channels.cache.get(req[0].channelMessage)
    if(channel) channel.send({ embeds: [embed]})
})
  }
}
