const Discord = require("discord.js")

exports.help = {
    name: "say",
    category: 'utilitaire',
    description: "Envoyer un message avec le bot."
  };
  
exports.run = async (bot, message, args) => { 
    if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages)) {
        const embed = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`**❌ Vous avez besoin des permissions suivantes pour utiliser cette commande : Gérer les messages.**`)

        return message.reply({ embeds: [embed] })
    } else {
        const Nosay = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`**❌ Vous devez saisir un message à envoyer.**`)
        if(!args[0]) return message.reply({ embeds: [Nosay]})

        const embed = new Discord.EmbedBuilder()
        .setColor(message.member.roles?.highest.color || "White")
        .setDescription(`${args} — ${message.author}`)
        
        message.delete()
        message.channel.send({ embeds: [embed]})
        
    }
} 