const Discord = require("discord.js")

exports.help = {
    name: "clear",
    category: 'mods',
  };
  
exports.run = async (bot, message, args) => { 
    if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages)) {
        const embed = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`**❌ Vous avez besoin des permissions suivantes pour utiliser cette commande : Gérer les messages.**`)

        return message.reply({ embeds: [embed] })
    } else {
        message.delete()
        const number = args[0]
        if(!number || number < 1 || number > 100) {
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`**❌ Vous devez indiquer le nombre de messages à supprimer (entre 1 et 100).**`)
            return message.channel.send({ embeds: [embed] })
        } 
        const messages = await message.channel.messages.fetch({ limit: number });
        if(messages.size == 0) {
            const embed = new Discord.EmbedBuilder()
            .setDescription(`**ℹ️ Aucun message à supprimer. Si les messages datent de plus de 14 jours, ils ne seront pas supprimés.**`)
            .setColor("Blue")
            return message.channel.send({ embeds: [embed]}).then(m => setTimeout(() => { m.delete() }, 5000 ))
        }
        await message.channel.bulkDelete(messages, true);
        const embed = new Discord.EmbedBuilder()
        .setDescription(`**✅ ${messages.size} messages supprimés.**`)
        .setColor("Green")

        message.channel.send({ embeds: [embed]}).then(m => setTimeout(() => { m.delete() }, 5000 ))
    }
}