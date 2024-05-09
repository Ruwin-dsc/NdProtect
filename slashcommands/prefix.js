const Discord = require("discord.js")

module.exports = {
    name: 'prefix',
    description: 'Configurer le préfixe du bot.',
    permission: "Aucune",
    dm: false,
    options: [
        {
          type: "string",
          name: "new_prefix",
          description: "Nouveau préfixe pour utiliser le bot.",
          required: false,
          autocomplete: false,
        },
      ],
    async run(bot, message, args) {
        bot.db.query(`SELECT * FROM bot WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        const prefix = args.getString("new_prefix")
        if(!prefix) {
            const embed = new Discord.EmbedBuilder()
            .setColor("Blue")
            .setDescription(`**ℹ️ Mon préfixe sur le serveur est \`${req[0].prefix}\`**`)
            message.reply({ embeds: [embed]})
        } else {
            if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
                const embed = new Discord.EmbedBuilder()
                .setColor("Red")
                .setDescription(`**❌ Vous devez être administrateur pour changer le préfixe.**`)
    
                return message.reply({ embeds: [embed] })
              } else {
                if(prefix.length > 10) {
                    const embed = new Discord.EmbedBuilder()
                    .setColor("Red")
                    .setDescription(`**❌ Le préfixe ne doit pas dépasser les 10 caractères.**`)
    
                    return message.reply({ embeds: [embed] })
                } else {
                    await bot.db.query(`UPDATE bot SET prefix = "${prefix}" WHERE guildId = ${message.guild.id}`);
                    const embed = new Discord.EmbedBuilder()
                    .setColor("Green")
                    .setDescription(`**✅ Le préfixe a été changé en \`${prefix}\`**`)
    
                    return message.reply({ embeds: [embed] })
                }
              }
        }
    })
    }
}