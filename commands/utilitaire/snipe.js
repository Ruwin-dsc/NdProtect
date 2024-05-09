const Discord = require("discord.js")

exports.help = {
    name: "snipe",
    category: 'utilitaire',
    description: "Afficher les derniers messages supprimés."
  };
  
exports.run = async (bot, message, args) => { 
    if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages)) {
        const embed = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`**❌ Vous avez besoin des permissions suivantes pour utiliser cette commande : Gérer les messages.**`)

        return message.reply({ embeds: [embed] })
    } else {
        const snipes = bot.snipes.get(message.channel.id);
        if(!snipes) {
            const embed = new Discord.EmbedBuilder()
            .setDescription(`**❌ Aucun message n'a été supprimé dans ce salon.**`)
            .setColor("Red")
            return message.reply({ embeds: [embed]})
        } else

        if(!args[0]) {       
            const numSnipes = 1;
            const target = snipes[numSnipes - 1];

            const { msg, time, rolecolor } = target;

            const embed = new Discord.EmbedBuilder()
            .setDescription(`${msg.content}`)
            .setColor(rolecolor)
            .setAuthor({ name: `@${msg.author.username}`, iconURL: msg.author.displayAvatarURL({ dynamic: true }), url: "https://discord.gg/AcJw5Jwyan"})
            .setTimestamp(time)

            message.reply({ embeds: [embed]})
        } else {
            const embed2 = new Discord.EmbedBuilder()
            .setDescription(`**❌ Vous ne pouvez pas afficher plus de 10 messages**`)
            .setColor('Red')
            if(args[0] > 10) return message.reply({ embeds: [embed2]})
            
            let embeds = [], count = 1, count2 = 0;
            snipes.forEach(() => {
                if(count2 == Number(args[0])) return 
                const target = snipes[count - 1]
                if(!target) return count++, count2++
                const { msg, time, rolecolor } = target;

                const embed = new Discord.EmbedBuilder()
                .setDescription(`${msg.content}`)
                .setColor(rolecolor)
                .setAuthor({ name: `@${msg.author.username}`, iconURL: msg.author.displayAvatarURL({ dynamic: true }), url: "https://discord.gg/AcJw5Jwyan"})
                .setTimestamp(time)

                embeds.push(embed), count++, count2++
            })
            message.reply({ embeds: embeds})
        }
        
    }
}