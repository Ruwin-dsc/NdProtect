// faîte par .crackk (chat GPT essentiellement)

const Discord = require("discord.js")

exports.help = {
    name: "clear-roles",
    category: 'admin',
    description: "Supprimer tous les salons ayant un nom spécifique.",
    aliases: ["clearroles", "cr"]
};

exports.run = async (bot, message, args) => {
    bot.db.query(`SELECT * FROM bot WHERE guildId = "${message.guild.id}"`, async (err, req) => {
    const whitelist = JSON.parse(req[0].whitelist)

    if(message.author.id !== message.guild.ownerId && !whitelist.includes(message.author.id)) {
        const embedError = new Discord.EmbedBuilder()
        .setColor("#ff0000")
        .setDescription(`**❌ Je n'ai pas la permission de supprimer les rôles.**`);

        return message.reply({ embeds: [embedError] });
    }
    if(!args[0]) return message.reply({ embeds: [new Discord.EmbedBuilder().setColor("Red").setDescription(`**❌ Veuillez mentionner un rôle ou indiquer un nom de salon.**`)]})
    const rolename = message.mentions.roles.first()?.name || message.guild.roles.cache.get(args[0])?.name || args.join(" ")

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