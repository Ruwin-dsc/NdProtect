const Discord = require("discord.js")

exports.help = {
    name: "ping",
    category: 'othercommand',
    description: "Afficher le ping du bot."
  };
  
  exports.run = async (bot, message, args) => { 
    const embed = new Discord.EmbedBuilder()
    .setDescription(`**🏓 Mon ping est de :** ${bot.ws.ping}ms.`)
    .setColor('White')

    message.reply({ embeds: [embed] })

  }