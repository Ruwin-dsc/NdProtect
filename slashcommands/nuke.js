const Discord = require("discord.js")

module.exports = {
    name: 'nuke',
    description: 'Supprimer un salon et le recréer.',
    permission: "Aucune",
    dm: false,
    async run(bot, message, args) {
        if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) {
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`**❌ Vous avez besoin des permissions suivantes pour utiliser cette commande : Gérer les salons.**`)
    
            return message.reply({ embeds: [embed] })
        } else {
            try {
            const channel2 = await message.channel.clone({ reason: `Channel recréé par ${message.user.username}` });
            await message.channel.delete();
            const embed = new Discord.EmbedBuilder()
            .setColor("White")
            .setDescription("**☣️ Salon recréé.***")
            await channel2.send({ embeds: [embed]}).then((m) => setTimeout(() => m.delete(), 5000))
            } catch (e) {
                console.log(e)
                const embed = new Discord.EmbedBuilder()
                .setColor("Red")
                .setDescription("**❌ Impossible de recréer le salon des règles de la communauté.**")
                return message.reply({ embeds: [embed]})
            }
        }
    }
}