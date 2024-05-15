// faîte par .crackk (chat GPT essentiellement)

const Discord = require("discord.js")

exports.help = {
    name: "clear-channels",
    category: 'admin',
    description: "Supprimer tous les salons ayant un nom spécifique.",
    aliases: ["clearchannels", "cc"]
};

exports.run = async (bot, message, args) => {
    bot.db.query(`SELECT * FROM bot WHERE guildId = "${message.guild.id}"`, async (err, req) => {
    const whitelist = JSON.parse(req[0].whitelist)

    if(message.author.id !== message.guild.ownerId && !whitelist.includes(message.author.id)) {
        const embedError = new Discord.EmbedBuilder()
        .setColor("#ff0000")
        .setDescription(`**❌ Vous devez être le propriétaire du serveur pour exécuter cette commande.**`);

        return message.reply({ embeds: [embedError] });
    }
    if(!args[0]) return message.reply({ embeds: [new Discord.EmbedBuilder().setColor("Red").setDescription(`**❌ Veuillez mentionner un salon ou indiquer un nom de salon.**`)]})

    const channelName = message.mentions.channels.first()?.name || message.guild.channels.cache.get(args[0])?.name || args.join(" ")
    const channelsToDelete = message.guild.channels.cache.filter(channel => channel.name === channelName);

    if (channelsToDelete.size === 0) {
        const embedError = new Discord.EmbedBuilder()
        .setColor("#ff0000")
        .setDescription(`**❌ Aucun salon trouvé avec ce nom.**`);

        return message.reply({ embeds: [embedError] });
    }

    const embedInfo = new Discord.EmbedBuilder()
        .setColor("Blue")
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
            .setColor("Green")
            .setDescription(`**✅ Suppression de ${channelsToDelete.size} salon(s) effectuée avec succès.**`);

        message.channel.send({ embeds: [embedSuccess]});
    }).catch((error) => {
    
    });
})
}