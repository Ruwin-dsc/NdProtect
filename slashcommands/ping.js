const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Afficher le ping du bot.',
    permission: "Aucune",
    dm: false,
    async run(bot, interaction, args) {
    const embed = new Discord.EmbedBuilder()
    .setDescription(`**🏓 Mon ping est de :** ${bot.ws.ping}ms.`)
    .setColor('White')

    interaction.reply({ embeds: [embed] })
    }
}