const Discord = require("discord.js")

module.exports = {
    name: "guildCreate",
    async execute(guild, bot) {
        const commands = await bot.application.commands.fetch();
        function findByName(name) {
            return commands.find(command => command.name === name)
        }
        const embed = new Discord.EmbedBuilder()
        .setColor("White")
        .setAuthor({ name: `Merci de m'avoir ajouté !`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`Voici comment faire pour bien débuter avec **${bot.user.username}**.`)
        .addFields(
            { name: "I. Configuration de l'anti-raid", value: `> Mes sécurités anti-raid sont déjà activées ! Si vous voulez les modifier, ça sera avec la commande ${Discord.chatInputApplicationCommandMention("config", findByName("config").id)}.` },
            { name: "II. IMPORTANT : configuration des rôles", value: `> Afin que j'arrête la majorité des raids, il est **indispensable** de placer mon rôle d'intégration **@${bot.user.username}** en premier dans la liste des rôles (y compris au dessus des administrateurs).` },
            { name: "III. Ajouter des personnes à la liste blanche", value: `> Si vous voulez que j'ignore certaines personnes, ça sera avec la commande ${Discord.chatInputApplicationCommandMention("whitelist", findByName("whitelist").id)}.` },
            { name: "IV. Une dernière chose", value: `> La liste de mes commandes est disponible avec ${Discord.chatInputApplicationCommandMention("help", findByName("help").id)}. Si vous avez des questions, le support reste à votre disposition !` },
        )

        const bouton1 = new Discord.ButtonBuilder()
        .setStyle('Link')
        .setLabel(`Serveur support`)
        .setEmoji('<:dev:1145032258508570634>')
        .setURL('https://discord.gg/3PA53mfwSv');
        const bouton2 = new Discord.ButtonBuilder()
        .setStyle('Link')
        .setLabel(`Site internet`)
        .setEmoji('🔗')
        .setURL('https://discord.gg/3PA53mfwSv');

    const row = new Discord.ActionRowBuilder().addComponents(bouton1, bouton2);

        guild.members.cache.get(guild.ownerId).send({ embeds: [embed], components: [row] })
        if(guild.systemChannel) guild.systemChannel.send({ embeds: [embed], components: [row], content: `<@${guild.ownerId}>` })
        else guild.channels.cache.find(channel => channel.type === Discord.ChannelType.GuildText).send({ embeds: [embed], components: [row], content: `<@${guild.ownerId}>` });


    }};
