const Discord = require("discord.js")

module.exports = {
    name: 'clear-roles',
    description: 'Supprime tous les rôles ayant un nom spécifique.',
    permission: "Aucune",
    dm: false,
    options: [
        {
          type: "string",
          name: "role_or_role_name",
          description: "Nom du ou des rôles à supprimer.",
          required: true,
          autocomplete: false,
        },
      ],
    async run(bot, message, args) {
        bot.db.query(`SELECT * FROM bot WHERE guildId = "${message.guild.id}"`, async (err, req) => {
            const whitelist = JSON.parse(req[0].whitelist)
        
            if(message.user.id !== message.guild.ownerId && !whitelist.includes(message.user.id)) {
                const embedError = new Discord.EmbedBuilder()
                .setColor("#ff0000")
                .setDescription(`**❌ Je n'ai pas la permission de supprimer les rôles.**`);
        
                return message.reply({ embeds: [embedError] });
            }
            if(!args[0]) return message.reply({ embeds: [new Discord.EmbedBuilder().setColor("Red").setDescription(`**❌ Veuillez mentionner un rôle ou indiquer un nom de salon.**`)]})
            const rolename = message.guild.roles.cache.get(args.getString("role_or_role_name"))?.name || args.getString("role_or_role_name")
        
            const rolesToDelete = message.guild.roles.cache.filter(role => role.name === rolename) ;
        
            if (rolesToDelete.size === 0) {
                const errorEmbed = new Discord.EmbedBuilder()
                    .setColor("#FF0000")
                    .setDescription("**❌ Aucun rôle trouvé avec ce nom.**");
                return message.reply({ embeds: [errorEmbed] });
            }
        
            const infoEmbed = new Discord.EmbedBuilder()
                .setColor("#3498DB")
                .setDescription(`**ℹ️ Suppression de ${rolesToDelete.size} rôles en cours...**`);
        
        
            message.reply({ embeds: [infoEmbed] }).then(() => {
                Promise.all(rolesToDelete.map(async role => {
                    await role.delete();
                })).then(() => {
                    const successEmbed = new Discord.EmbedBuilder()
                        .setColor("#2ECC71")
                        .setDescription(`**✅ Suppression de ${rolesToDelete.size} rôles effectuée avec succès.**`);
        
                    message.channel.send({ embeds: [successEmbed] });
                })
            });
        
        })
    }
}