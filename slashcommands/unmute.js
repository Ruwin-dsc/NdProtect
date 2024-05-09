const Discord = require("discord.js")

module.exports = {
    name: 'unmute',
    description: 'Rendre la parole à un membre du serveur.',
    permission: "Aucune",
    dm: false,
    options: [
        {
          type: "user",
          name: "member",
          description: "Membre à qui rendre la parole.",
          required: true,
          autocomplete: false,
        }
      ],
    async run(bot, message, args) {
        if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.MuteMembers)) {
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`**❌ Vous avez besoin des permissions suivantes pour utiliser cette commande : Expulser temporairement les membres**`)
    
            return message.reply({ embeds: [embed] })
        } else {
            const user = message.guild.members.cache.get(args.getUser("member").id)
            if(!user) {
                const embed = new Discord.EmbedBuilder()
                .setColor("Red")
                .setDescription(`**❌ Cet utilisateur n'existe pas.**`)
    
                return message.reply({ embeds: [embed] })
            } 
    
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            
            if(message.user.id == user.id) return message.reply({ embeds: [embed.setDescription("**❌ Vous ne pouvez pas vous rendre la parole à vous-même**")]})
            if(message.guild.ownerId == user.id) return message.reply({ embeds: [embed.setDescription(`**❌ Je n'ai pas les permissions de rendre la parole à ${user} ?.**`)]})
    
            await user.timeout(null);
            message.reply({ embeds: [embed.setColor("Green").setDescription(`**✅ ${user} peut de nouveau parler sur le serveur.**`)]})
        }
    }
}