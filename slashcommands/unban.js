const Discord = require("discord.js")

module.exports = {
    name: 'unban',
    description: 'Révoquer le banissement d\'un utilisateur.',
    permission: "Aucune",
    dm: false,
    options: [
        {
          type: "user",
          name: "user",
          description: "Utilisateur à débannir du serveur.",
          required: true,
          autocomplete: false,
        }
      ],
    async run(bot, message, args) {
        if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) {
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`**❌ Vous avez besoin des permissions suivantes pour utiliser cette commande : Bannir les membres**`)
    
            return message.reply({ embeds: [embed] })
        } else {
            const user = args.getUser("user")
            if(!user) {
                const embed = new Discord.EmbedBuilder()
                .setColor("Red")
                .setDescription(`**❌ Cet utilisateur n'existe pas.**`)
    
                return message.reply({ embeds: [embed] })
            } 
    
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            
            if(message.user.id == user.id) return message.reply({ embeds: [embed.setDescription("**❌ Vous ne pouvez pas vous débannir vous-même**")]})
            if(message.guild.ownerId == user.id) return message.reply({ embeds: [embed.setDescription(`**❌ Je n'ai pas les permissions de débannir ${user} ?.**`)]})
    
            message.guild.members.unban(user).then(async () => {
                message.reply({ embeds: [embed.setColor("Green").setDescription(`**✅ ${user} n'est plus banni du serveur.**`)]})
            }).catch(async () => {
                message.reply({ embeds: [embed.setColor("Red").setDescription(`**:x: ${user} n'est pas banni du serveur.**`)]})
            });
        }
    }
}