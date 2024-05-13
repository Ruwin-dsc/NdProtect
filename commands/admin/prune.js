// faîte par .crackk (chat GPT essentiellement)

const Discord = require("discord.js");
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');

exports.help = {
    name: "prune",
    category: 'admin',
};

exports.run = async (bot, message, args) => {
    bot.db.query(`SELECT * FROM bot WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        const whitelist = JSON.parse(req[0].whitelist)
    
        if(message.author.id !== message.guild.ownerId && !whitelist.includes(message.author.id)) {
            const embedError = new Discord.EmbedBuilder()
            .setColor("#ff0000")
            .setDescription(`**❌ Je n'ai pas la permission d'exclure les membres.**`);
    
            return message.reply({ embeds: [embedError] });
        }

        const delai = args[0];

        const isValidDelay = /^([1-9]|[1-9][0-9]+)(m|h|d)$/.test(delai);
        if (!isValidDelay) {
            const invalidDelayEmbed = new EmbedBuilder()
                .setColor("#FF0000")
                .setDescription("**❌ Veuillez indiquer un délai valide (entre 5 minutes et 1 jour).**");
            return message.reply({ embeds: [invalidDelayEmbed] });
        }

        const match = /^([1-9]|[1-9][0-9]+)(m|h|d)$/.exec(delai);
        const amount = parseInt(match[1]);
        const unit = match[2];

        let timeLimit;
        switch (unit) {
            case "m":
                timeLimit = amount * 60 * 1000;
                break;
            case "h":
                timeLimit = amount * 60 * 60 * 1000;
                break;
            case "d":
                timeLimit = amount * 24 * 60 * 60 * 1000;
                break;
            default:
                return;
        }

        if ((unit === "m" && amount < 5) || (unit === "d" && amount > 1)) {
            const invalidTimeEmbed = new EmbedBuilder()
                .setColor("Red")
                .setDescription("**❌ Veuillez indiquer un délai valide (entre 5 minutes et 1 jour).**");
            return message.reply({ embeds: [invalidTimeEmbed] });
        }

        await message.guild.members.fetch();

        const membersToPrune = message.guild.members.cache.filter(member => {
            const timeOnServer = Date.now() - member.joinedAt.getTime();
            return timeOnServer <= timeLimit; 
        });

        if (membersToPrune.size === 0) {
            const noMembersEmbed = new EmbedBuilder()
                .setColor("Blue")
                .setDescription(`**ℹ️ Aucun membre n'a rejoint le serveur il y a moins de ${amount}${unit}, ou je n'ai pas les permissions pour les expulser.**`);
            return message.reply({ embeds: [noMembersEmbed] });
        }


        const confirmationEmbed = new EmbedBuilder()
            .setColor("White")
            .setAuthor({ name: 'Expulsion des membres récents', iconURL: bot.user.displayAvatarURL(), url: "https://discord.gg/JkduXanB8r" })
            .setDescription(`Êtes-vous sûr de vouloir expulser les ${membersToPrune.size} membres ayant rejoint le serveur il y a moins de ${amount}${unit} ?`)
            .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}` })

        const confirmButton = new ButtonBuilder()
            .setCustomId('confirm_button')
            .setLabel('Confirmer')
            .setStyle(3);

        const cancelButton = new ButtonBuilder()
            .setCustomId('cancel_button')
            .setLabel('Annuler')
            .setStyle(2);

        const actionRow = new ActionRowBuilder()
            .addComponents(confirmButton, cancelButton);

        message.reply({ embeds: [confirmationEmbed], components: [actionRow] });

        const collector = message.channel.createMessageComponentCollector({ time: 15000 });

        collector.on('collect', async i => {
            if (i.user.id !== message.author.id) {
                const permissionDeniedEmbed = new EmbedBuilder()
                    .setColor("Red")
                    .setDescription("**❌ Vous n'avez pas les permissions d'utiliser ce bouton, ou alors le délai d'exécution de la commande est dépassé.**");
                return i.reply({ embeds: [permissionDeniedEmbed], ephemeral: true });
            }

            if (i.customId === 'confirm_button') {
                membersToPrune.forEach(async member => {
                    try {
                        await member.kick(`Expulsion des membres récents par @${message.author.username}`);
                    } catch (error) {
                    }
                });
                const inProgressEmbed = new EmbedBuilder()
                    .setColor("Blue")
                    .setDescription(`**ℹ️ Expulsion des ${membersToPrune.size} membres en cours...**`);
                await i.reply({ embeds: [inProgressEmbed] });

                const successEmbed = new EmbedBuilder()
                    .setColor("Green")
                    .setDescription(`**✅ Expulsion des ${membersToPrune.size} membres terminée.**`);
                await i.channel.send({ embeds: [successEmbed], ephemeral: false });

            } else if (i.customId === 'cancel_button') {
                const cancelledEmbed = new EmbedBuilder()
                    .setColor("Red")
                    .setDescription("**❌ Expulsion des membres récents annulée.**");
                i.reply({ embeds: [cancelledEmbed], ephemeral: false });
            }          

        });


    })
}