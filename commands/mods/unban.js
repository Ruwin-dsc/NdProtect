const Discord = require("discord.js")
const ms = require("ms")
exports.help = {
    name: "unban",
    category: 'mods'
  };
  
exports.run = async (bot, message, args) => { 
    if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) {
        const embed = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`**❌ Vous avez besoin des permissions suivantes pour utiliser cette commande : Bannir les membres**`)

        return message.reply({ embeds: [embed] })
    } else {
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || await bot.users.fetch(args[0])
        if(!user) {
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`**❌ Cet utilisateur n'existe pas.**`)

            return message.reply({ embeds: [embed] })
        } 

        const embed = new Discord.EmbedBuilder()
        .setColor("Red")
        
        if(message.author.id == user.id) return message.reply({ embeds: [embed.setDescription("**❌ Vous ne pouvez pas vous débannir vous-même**")]})
        if(message.guild.ownerId == user.id) return message.reply({ embeds: [embed.setDescription(`**❌ Je n'ai pas les permissions de débannir ${user} ?.**`)]})

        message.guild.members.unban(user).then(async () => {
            message.reply({ embeds: [embed.setColor("Green").setDescription(`**✅ ${user} n'est plus banni du serveur.**`)]})
        }).catch(async () => {
            message.reply({ embeds: [embed.setColor("Red").setDescription(`**:x: ${user} n'est pas banni du serveur.**`)]})
        });
    }
}