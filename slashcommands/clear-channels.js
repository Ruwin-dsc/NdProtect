const Discord = require("discord.js")

module.exports = {
    name: 'clear-channels',
    description: 'Supprime tous les salons ayant un nom spécifique.',
    permission: "Aucune",
    dm: false,
    options: [
        {
          type: "string",
          name: "channel_or_channel_name",
          description: "Nom du ou des salons à supprimer.",
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
                .setDescription(`**❌ Je n'ai pas la permission de supprimer les salons.**`);
        
                return message.reply({ embeds: [embedError] });
            }
        
            const channelName = message.guild.roles.cache.get(args.getString("channel_or_channel_name"))?.name || args.getString("channel_or_channel_name")
            const channelsToDelete = message.guild.channels.cache.filter(channel => channel.name === channelName);
        
            if (channelsToDelete.size === 0) {
                const embedError = new Discord.EmbedBuilder()
                .setColor("#ff0000")
                .setDescription(`**❌ Aucun salon trouvé avec ce nom.**`);
        
                return message.reply({ embeds: [embedError] });
            }
        
            const embedInfo = new Discord.EmbedBuilder()
                .setColor("#3498db")
                .setDescription(`**ℹ️ Suppression de ${channelsToDelete.size} salon(s) en cours...**`);
        
            message.reply({ embeds: [embedInfo] }).then(() => {
                let successfulDeletions = 0;
        
                channelsToDelete.forEach(async (channel) => {
                    try {
                        await channel.delete();
                        successfulDeletions++;
                    } catch (error) {
                    }
                });
        
                const embedSuccess = new Discord.EmbedBuilder()
                    .setColor("#2ecc71")
                    .setDescription(`**✅ Suppression de ${channelsToDelete.size} salon(s) effectuée avec succès.**`);
        
                message.channel.send({ embeds: [embedSuccess]});
            }).catch((error) => {
            
            });
        })
    }
}