const Discord = require("discord.js")

module.exports = {
    name: 'snipe',
    description: 'Afficher les derniers messages supprimés.',
    permission: "Aucune",
    dm: false,
    options: [
        {
            type: "number",
            name: "message_number",
            description: "Nombre de messages à afficher.",
            required: false,
            autocomplete: false,
        },
    ],
    async run(bot, message, args) {
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
    
            if(!args.getNumber("message_number")) {       
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
                if(args.getNumber("message_number") > 10) return message.reply({ embeds: [embed2], ephemeral: true })
                
                let embeds = [], count = 1, count2 = 0;
                snipes.forEach(() => {
                    if(count2 == args.getNumber("message_number")) return 
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
}