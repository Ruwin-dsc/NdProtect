const Discord = require("discord.js")

module.exports = {
    name: 'say',
    description: 'Envoyer un message avec le bot.',
    permission: "Aucune",
    dm: false,
    options: [
        {
            type: "string",
            name: "text",
            description: "Message que va envoyer.",
            required: true,
            autocomplete: false,
        },
    ],
    async run(bot, message, args) {
        if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages)) {
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`**❌ Vous avez besoin des permissions suivantes pour utiliser cette commande : Gérer les messages.**`)
    
            return message.reply({ embeds: [embed], ephemeral: true })
        } else {   
            const embed = new Discord.EmbedBuilder()
            .setColor(message.member.roles?.highest.color || "White")
            .setDescription(`${args.getString("text")}`)
            
            message.reply({ embeds: [embed]})
            
        }
    }
}