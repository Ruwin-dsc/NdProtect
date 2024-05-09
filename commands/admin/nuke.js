const Discord = require("discord.js");

exports.help = {
    name: "nuke",
    category: 'admin',
    aliases: ["renew"]
};

exports.run = async (bot, message, args) => {
    if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) {
        const embed = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`**❌ Vous avez besoin des permissions suivantes pour utiliser cette commande : Gérer les salons.**`)

        return message.reply({ embeds: [embed] })
    } else {
        try {
        await channel.delete();
        const channel = await message.channel.clone({ reason: `Channel recréé par ${message.author.username}` });
        const embed = new Discord.EmbedBuilder()
        .setColor("White")
        .setDescription("**☣️ Salon recréé.***")
        await channel.send({ embeds: [embed]}).then((m) => setTimeout(() => m.delete(), 5000))
        } catch (e) {
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription("**❌ Impossible de recréer le salon des règles de la communauté.**")
            return message.reply({ embeds: [embed]})
        }
    }
}