const Discord = require("discord.js")

module.exports = {
    name: 'kick',
    description: 'Expulser une personne.',
    permission: "Aucune",
    dm: false,
    options: [
        {
          type: "user",
          name: "user",
          description: "Membre à expulser du serveur.",
          required: true,
          autocomplete: false,
        },
        {
            type: "string",
            name: "reason",
            description: "Raison de l'expulsion.",
            required: false,
            autocomplete: false,
          },
      ],
    async run(bot, message, args) {
        message.author = message.user
        if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.KickMembers)) {
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`**❌ Vous avez besoin des permissions suivantes pour utiliser cette commande : Expulser des membres.**`)
    
            return message.reply({ embeds: [embed] })
        } else {
            const user = message.guild.members.cache.get(args.getUser("user").id)
            if(!message.guild.members.cache.get(user.id)) {
                const embed = new Discord.EmbedBuilder()
                .setColor("Red")
                .setDescription(`**❌ Cet utilisateur n'existe pas.**`)
    
                return message.reply({ embeds: [embed] })
            } 
            
            let reason = args.getString("reason") || `Aucune raison fournie`;
    
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            
            if(message.user.id == user.id) return message.reply({ embeds: [embed.setDescription("**❌ Vous ne pouvez pas vous expulser vous-même**")]})
            if(message.guild.ownerId == user.id) return message.reply({ embeds: [embed.setDescription(`**❌ Je n'ai pas les permissions d'expulser ${user}.**`)]})
            if (bot.user.id == user.id)  return message.reply({ embeds: [embed.setDescription(`**❌ Je n'ai pas les permissions d'expulser ${user}.**`)]})
            if (message.author.id !== message.guild.ownerId && user.roles.highest.position >= message.member.roles.highest.position) return message.reply({ embeds: [embed.setDescription(`**❌ Vous n'avez pas les permissions d'expulser ${user} ? car cet utilisateur est situé au dessus de vous dans la hiérarchie des rôles.**`)]})
    
            message.guild.members.kick(user, { reason: `[@${message.author.username}] ${reason}` })
            message.reply({ embeds: [embed.setColor("Green").setDescription(`**✅ ${user} a été expulsé du serveur.**`).setImage("https://media.discordapp.net/attachments/1170288145871413318/1237412141724860447/cheh.gif?ex=663b8d5c&is=663a3bdc&hm=4d31889ffbcc83386f08844110c58dfb09747d3da93482f55499f8cf56c3cf38&=&width=1480&height=832")]})
        }
    }
}