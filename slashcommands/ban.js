const Discord = require("discord.js")

module.exports = {
    name: 'ban',
    description: 'Bannir un utilisateur du serveur.',
    permission: "Aucune",
    dm: false,
    options: [
        {
          type: "user",
          name: "user",
          description: "Utilisateur à bannir du serveur.",
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
        if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) {
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`**❌ Vous avez besoin des permissions suivantes pour utiliser cette commande : Bannir des membres.**`)
    
            return message.reply({ embeds: [embed] })
        } else {
            const user = args.getUser("user")
            if(!user) {
                const embed = new Discord.EmbedBuilder()
                .setColor("Red")
                .setDescription(`**❌ Cet utilisateur n'existe pas.**`)
    
                return message.reply({ embeds: [embed] })
            } 
            
            let reason = args.getString("reason") || `Aucune raison fournie`;
    
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            let e = "a"
            
            if(message.user.id == user.id) return message.reply({ embeds: [embed.setDescription("**❌ Vous ne pouvez pas vous bannir vous-même**")]})
            if(message.guild.ownerId == user.id) return message.reply({ embeds: [embed.setDescription(`**❌ Je n'ai pas les permissions de bannir ${user}.**`)]})
            if (bot.user.id == user.id)  return message.reply({ embeds: [embed.setDescription(`**❌ Je n'ai pas les permissions de bannir ${user}.**`)]})
            if (message.user.id !== message.guild.ownerId && message.guild.members.cache.get(user.id) ? message.guild.members.cache.get(user.id).roles.highest.position >= message.member.roles.highest.position : false) return message.reply({ embeds: [embed.setDescription(`**❌ Vous n'avez pas les permissions de bannir ${user} ? car cet utilisateur est situé au dessus de vous dans la hiérarchie des rôles.**`)]})
    
            message.guild.members.ban(user, { reason: reason })
            message.reply({ embeds: [embed.setColor("Green").setDescription(`**✅ ${user} a été banni du serveur.**`).setImage("https://media.discordapp.net/attachments/1170288145871413318/1237412141724860447/cheh.gif?ex=663b8d5c&is=663a3bdc&hm=4d31889ffbcc83386f08844110c58dfb09747d3da93482f55499f8cf56c3cf38&=&width=1480&height=832")]})
        }
    }
}
