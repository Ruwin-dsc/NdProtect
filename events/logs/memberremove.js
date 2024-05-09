const Discord = require("discord.js");
const config = require('../../config.json')
module.exports = {
  name: "guildMemberRemove",
  async execute(member, bot) {
    let check = false
    bot.db.query(`SELECT * FROM logs WHERE guildId = "${member.guild.id}"`, async (err, req) => {
    if(req.length < 1) return

    const embed = new Discord.EmbedBuilder()
    .setDescription(`${member} a quitté le serveur.`)
    .setFooter({ text: `ID de l'utilisateur : ${member.user.id}`})
    .setTitle("Départ d'un membre")
    .setThumbnail(member.displayAvatarURL({ dynamic: true }))
    .setAuthor({ name: `@${member.user.username}`, iconURL: member.user.displayAvatarURL({ dynamic: true }), url: "https://discord.gg/3PA53mfwSv" })
    .setColor("Red")
    .setTimestamp()
    .addFields(
        { name: "Avait rejoint le serveur :", value: `> <t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)` },
        { name: "Rôles de l'utilisateur :", value: `> ${member.roles.cache.filter(role => role.name !== "@everyone").map(role => role).join(", ") || "Aucun rôle"}` },
    )
    const channel = member.guild.channels.cache.get(req[0].channelMember)
    if(channel) {
        const bouton1 = new Discord.ButtonBuilder()
        .setStyle(Discord.ButtonStyle.Secondary)
        .setLabel(`Restaurer les rôles`)
        .setCustomId("restaurroles")
        const row = new Discord.ActionRowBuilder().addComponents(bouton1)
        const msg = await channel.send({ embeds: [embed], components: [row]})
        const collector = msg.createMessageComponentCollector({});
        collector.on("collect", async (interaction) => {
            if(interaction.customId == "restaurroles") {
                interaction.deferUpdate()
                if(check == true || member.roles.cache.size == 1) {
                    const embed = new Discord.EmbedBuilder()
                    .setColor("Red")
                    .setDescription(`**❌ Aucun rôle à restaurer.**`)
                    channel.send({ embeds: [embed]})
                } else {
                    check = true
                    await member.roles.cache.filter(role => role.name !== "@everyone").forEach(m => {
                        member.roles.add(m.id)
                    })
                    const embed = new Discord.EmbedBuilder()
                    .setColor("Green")
                    .setDescription(`**✅ Les rôles ont bien été restaurés.**`)
                    await channel.send({ embeds: [embed]})
                }
            }
        })
    
    }
})
  }
}
