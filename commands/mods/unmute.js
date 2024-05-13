const Discord = require("discord.js")
const ms = require("ms")
exports.help = {
    name: "unmute",
    category: 'mods'
  };
  
exports.run = async (bot, message, args) => { 
    if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.MuteMembers)) {
        const embed = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`**❌ Vous avez besoin des permissions suivantes pour utiliser cette commande : Expulser temporairement les membres**`)

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

        const embed = new Discord.EmbedBuilder()
        .setColor("Red")
        
        if(message.author.id == user.id) return message.reply({ embeds: [embed.setDescription("**❌ Vous ne pouvez pas vous rendre la parole à vous-même**")]})
        if(message.guild.ownerId == user.id) return message.reply({ embeds: [embed.setDescription(`**❌ Je n'ai pas les permissions de rendre la parole à ${user}.**`)]})

        await user.timeout(null);
        message.reply({ embeds: [embed.setColor("Green").setDescription(`**✅ ${user} peut de nouveau parler sur le serveur.**`)]})
    }
}