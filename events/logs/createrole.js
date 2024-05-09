const Discord = require("discord.js");
const config = require('../../config.json')
module.exports = {
  name: "roleCreate",
  async execute(role, bot) {
    bot.db.query(`SELECT * FROM logs WHERE guildId = "${role.guild.id}"`, async (err, req) => {
        const embed = new Discord.EmbedBuilder()
        .setColor("Green")
        .setTimestamp()
        .setTitle(`Création d'un rôle`)
        .setDescription(`Rôle créé : ${role} \`${role.name}\`.`)
        .setFooter({ text: `ID du rôle : ${role.id}` })
        const channel2 = role.guild.channels.cache.get(req[0].channelGuild)
        if(channel2) channel2.send({ embeds: [embed]})
    })
}}