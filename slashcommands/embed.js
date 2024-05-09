const Discord = require("discord.js")

module.exports = {
    name: 'embed',
    description: 'Construire et envoyer un embed avec le bot.',
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    async run(bot, message, args) {
        if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) {
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`**❌ Vous avez besoin des permissions suivantes pour utiliser cette commande : Gérer les salons.**`)
    
            return message.reply({ embeds: [embed] })
        } else {
            return message.reply(":x: Non disponible !, || Je peux vous la refaire pour 3€ PayPal ! https://paypal.me/whitehallv2 https://discord.gg/uhq")
        }
    }
}