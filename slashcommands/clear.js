const Discord = require("discord.js")

module.exports = {
    name: 'clear',
    description: 'Supprimer des messages.',
    permission: "Aucune",
    dm: false,
    options: [
        {
          type: "number",
          name: "number_of_messages",
          description: "Nombre de messages à supprimer.",
          required: true,
          autocomplete: false,
        },
      ],
    async run(bot, message, args) {
        if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages)) {
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`**❌ Vous avez besoin des permissions suivantes pour utiliser cette commande : Gérer les messages.**`)
    
            return message.reply({ embeds: [embed] })
        } else {
            const number = args.getNumber("number_of_messages")
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
    
            message.reply({ embeds: [embed]}).then(m => setTimeout(() => { m.delete() }, 5000 ))
        }
    }
}