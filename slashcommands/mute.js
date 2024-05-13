const Discord = require("discord.js")
const ms = require('ms')
module.exports = {
    name: 'mute',
    description: 'Rendre muet un membre du serveur.',
    permission: "Aucune",
    dm: false,
    options: [
        {
          type: "user",
          name: "member",
          description: "Membre à rendre muet.",
          required: true,
          autocomplete: true,
        },
        {
            type: "string",
            name: "duration",
            description: "Durée pendant laquelle l'utilisateur sera rendu muet.",
            required: true,
            autocomplete: false,
          },
        {
            type: "string",
            name: "reason",
            description: "Raison du banissement.",
            required: false,
            autocomplete: false,
        },
      ],
    async run(bot, message, args) {
        if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.MuteMembers)) {
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`**❌ Vous avez besoin des permissions suivantes pour utiliser cette commande : Exclure temporairement des membres.**`)
    
            return message.reply({ embeds: [embed] })
        } else {
            const user = message.guild.members.cache.get(args.getUser("member").id)
            if(!user) {
                const embed = new Discord.EmbedBuilder()
                .setColor("Red")
                .setDescription(`**❌ Cet utilisateur n'existe pas.**`)
    
                return message.reply({ embeds: [embed] })
            } 
            
            let reason = args.getString("reason") || `Aucune raison fournie`;
    
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            
            if(message.user.id == user.id) return message.reply({ embeds: [embed.setDescription("**❌ Vous ne pouvez pas vous rendre muet vous-même**")]})
            if(message.guild.ownerId == user.id) return message.reply({ embeds: [embed.setDescription(`**❌ Je n'ai pas les permissions de rendre muet ${user}.**`)]})
            if (bot.user.id == user.id)  return message.reply({ embeds: [embed.setDescription(`**❌ Je n'ai pas les permissions de rendre muet ${user}.**`)]})
            if (user.roles.highest.position >= message.member.roles.highest.position) return message.reply({ embeds: [embed.setDescription(`**❌ Vous n'avez pas les permissions de rendre muet ${user} ? car cet utilisateur est situé au dessus de vous dans la hiérarchie des rôles.**`)]})
    
            let duree = args.getString("duration")
            if(!duree && !duree.endsWith("s") && !duree.endsWith("m") && !duree.endsWith("d") && !duree.endsWith('h')) return message.reply({ embeds: [embed.setDescription(`**❌ Vous devez fournir une durée valide (entre 5 secondes et 28 jours).**`)]})
            if(!parseInt(ms(duree)) || ms(duree) > 2419200000) return message.reply({ embeds: [embed.setDescription(`**❌ Vous devez fournir une durée valide (entre 5 secondes et 28 jours).**`)]})
    
            user.timeout(ms(duree), `[@${message.user.username}] ${reason}`);
            message.reply({ embeds: [embed.setColor("Green").setDescription(`**✅ ${user} a été rendu muet pendant ${args.getString("duration")}.**`)]})
        }
    }
}