const Discord = require("discord.js")

exports.help = {
    name: "prefix",
    category: 'admin',
    description: "Configurer le préfixe du bot.",
    aliases: ["setprefix"]
};

exports.run = async (bot, message, args) => {
    bot.db.query(`SELECT * FROM bot WHERE guildId = "${message.guild.id}"`, async (err, req) => {
    if(!args[0]) {
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
            if(args[0].length > 10) {
                const embed = new Discord.EmbedBuilder()
                .setColor("Red")
                .setDescription(`**❌ Le préfixe ne doit pas dépasser les 10 caractères.**`)

                return message.reply({ embeds: [embed] })
            } else {
                await bot.db.query(`UPDATE bot SET prefix = "${args[0]}" WHERE guildId = ${message.guild.id}`);
                const embed = new Discord.EmbedBuilder()
                .setColor("Green")
                .setDescription(`**✅ Le préfixe a été changé en \`${args[0]}\`**`)

                return message.reply({ embeds: [embed] })
            }
          }
    }
})
}