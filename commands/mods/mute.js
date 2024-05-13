const Discord = require("discord.js")
const ms = require("ms")
exports.help = {
    name: "mute",
    category: 'mods',
    aliases: ["temp-mute"]
  };
  
exports.run = async (bot, message, args) => { 
    if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.MuteMembers)) {
        const embed = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`**❌ Vous avez besoin des permissions suivantes pour utiliser cette commande : Exclure temporairement des membres.**`)

        return message.reply({ embeds: [embed] })
    } else {
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        user = message.guild.members.cache.get(user.id)
        if(!user) {
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`**❌ Cet utilisateur n'existe pas.**`)

            return message.reply({ embeds: [embed] })
        } 
        
        let reason = args.slice(2).join(' ') || `Aucune raison fournie`;

        const embed = new Discord.EmbedBuilder()
        .setColor("Red")
        let e = "a"
        if(message.author.id == user.id) return message.reply({ embeds: [embed.setDescription("**❌ Vous ne pouvez pas vous rendre muet vous-même**")]})
        if(message.guild.ownerId == user.id) return message.reply({ embeds: [embed.setDescription(`**❌ Je n'ai pas les permissions de rendre muet ${user} ?.**`)]})
        if (message.guild.members.cache.get(user.id) ? !message.guild.members.cache.get(user.id).bannable : e !== "a" || bot.user.id == user.id) return message.reply({ embeds: [embed.setDescription(`**❌ Je n'ai pas les permissions de rendre muet ${user}.**`)]})
        if (user.roles.highest.position >= message.member.roles.highest.position) return message.reply({ embeds: [embed.setDescription(`**❌ Vous n'avez pas les permissions de rendre muet ${user} ? car cet utilisateur est situé au dessus de vous dans la hiérarchie des rôles.**`)]})

        let duree = args[1]
        if(!duree && !duree.endsWith("s") && !duree.endsWith("m") && !duree.endsWith("d") && !duree.endsWith('h')) return message.reply({ embeds: [embed.setDescription(`**❌ Vous devez fournir une durée valide (entre 5 secondes et 28 jours).**`)]})
        if(!parseInt(ms(duree)) || ms(duree) > 2419200000) return message.reply({ embeds: [embed.setDescription(`**❌ Vous devez fournir une durée valide (entre 5 secondes et 28 jours).**`)]})

        user.timeout(ms(duree), `[@${message.author.username}] ${reason}`);
        message.reply({ embeds: [embed.setColor("Green").setDescription(`**✅ ${user} a été rendu muet pendant ${args[1]}.**`)]})
    }
}