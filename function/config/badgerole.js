const Discord = require("discord.js")

async function configRole(bot, message, interaction, msg, EmbedUtilitaire) {
    let role1, role2, role3, role4, role5, role6, role7, role8, role9, role10, role11, role12

    bot.db.query(`SELECT * FROM utilitaire WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        if(!message.guild.roles.cache.get(req[0].staff)) role1 = await message.guild.roles.create({ name: 'Équipe Discord', color: '#5865f2', reason: 'Rôle pour le badge Équipe Discord', icon: message.guild.premiumSubscriptionCount > 7 ? "https://cdn.discordapp.com/attachments/1170288145871413318/1235212976286339072/BadgeDiscordEmployee.png?ex=66338d3a&is=66323bba&hm=a34b7d235aaf47a79531d26daf57a2d2fb544dfc95996329308039b43d6207c8&" : null })
        else role1 = await message.guild.roles.cache.get(req[0].staff).edit({ name: 'Équipe Discord', color: '#5865f2', reason: 'Rôle pour le badge Équipe Discord', icon: message.guild.premiumSubscriptionCount > 7 ? "https://cdn.discordapp.com/attachments/1170288145871413318/1235212976286339072/BadgeDiscordEmployee.png?ex=66338d3a&is=66323bba&hm=a34b7d235aaf47a79531d26daf57a2d2fb544dfc95996329308039b43d6207c8&" : null })
        if(!message.guild.roles.cache.get(req[0].partner)) role2 = await message.guild.roles.create({ name: 'Propriétaire d\'un serveur partenaire', color: '#5865f2', reason: 'Rôle pour le badge Propriétaire d\'un serveur partenaire', icon: message.guild.premiumSubscriptionCount > 7 ? "https://media.discordapp.net/attachments/1170288145871413318/1235213027863826472/Dev.png?ex=66338d46&is=66323bc6&hm=2c17127282a950f3d41bd672f6251a8f6442507705f5d314376e05cdc731c48a&=&format=webp&quality=lossless&width=192&height=164" : null })
        else role2 = await message.guild.roles.cache.get(req[0].partner).edit({ name: 'Propriétaire d\'un serveur partenaire', color: '#5865f2', reason: 'Rôle pour le badge Propriétaire d\'un serveur partenaire', icon: message.guild.premiumSubscriptionCount > 7 ? "https://media.discordapp.net/attachments/1170288145871413318/1235213027863826472/Dev.png?ex=66338d46&is=66323bc6&hm=2c17127282a950f3d41bd672f6251a8f6442507705f5d314376e05cdc731c48a&=&format=webp&quality=lossless&width=192&height=164" : null })
        if(!message.guild.roles.cache.get(req[0].certifiedmod)) role3 = await message.guild.roles.create({ name: 'Ancien des programmes de modération', color: '#fc964b', reason: 'Rôle pour le badge Ancien des programmes de modération', icon: message.guild.premiumSubscriptionCount > 7 ? "https://media.discordapp.net/attachments/1170288145871413318/1235212974965260328/1233756607922569226.webp?ex=66338d3a&is=66323bba&hm=4338773454796a91c74ed6ea183f1e74883166b97ce8f6691763c23431e41de0&=&format=webp&width=256&height=256" : null })
        else role3 = await message.guild.roles.cache.get(req[0].certifiedmod).edit({ name: 'Ancien des programmes de modération', color: '#fc964b', reason: 'Rôle pour le badge Ancien des programmes de modération', icon: message.guild.premiumSubscriptionCount > 7 ? "https://media.discordapp.net/attachments/1170288145871413318/1235212974965260328/1233756607922569226.webp?ex=66338d3a&is=66323bba&hm=4338773454796a91c74ed6ea183f1e74883166b97ce8f6691763c23431e41de0&=&format=webp&width=256&height=256" : null })
        if(!message.guild.roles.cache.get(req[0].hypesquad)) role4 = await message.guild.roles.create({ name: 'Événements HypeSquad', color: '#fbb848', reason: 'Rôle pour le badge Événements HypeSquad', icon: message.guild.premiumSubscriptionCount > 7 ? "https://cdn.discordapp.com/emojis/1219370705058009200.webp?size=44&quality=lossless" : null })
        else role4 = await message.guild.roles.cache.get(req[0].hypesquad).edit({ name: 'Événements HypeSquad', color: '#fbb848', reason: 'Rôle pour le badge Événements HypeSquad', icon: message.guild.premiumSubscriptionCount > 7 ? "https://cdn.discordapp.com/emojis/1219370705058009200.webp?size=44&quality=lossless" : null })
        if(!message.guild.roles.cache.get(req[0].h1)) role5 = await message.guild.roles.create({ name: 'Bravery de la HypeSquad', color: '#9c84ef', reason: 'Rôle pour le badge Bravery de la HypeSquad', icon: message.guild.premiumSubscriptionCount > 7 ? "https://cdn.discordapp.com/emojis/1145029118157668443.webp?size=44&quality=lossless" : null })
        else role5 = await message.guild.roles.cache.get(req[0].h1).edit({ name: 'Bravery de la HypeSquad', color: '#9c84ef', reason: 'Rôle pour le badge Bravery de la HypeSquad', icon: message.guild.premiumSubscriptionCount > 7 ? "https://cdn.discordapp.com/emojis/1145029118157668443.webp?size=44&quality=lossless" : null })
        if(!message.guild.roles.cache.get(req[0].h2)) role6 = await message.guild.roles.create({ name: 'Brillance de la HypeSquad', color: '#f47b67', reason: 'Rôle pour le badge Brillance de la HypeSquad', icon: message.guild.premiumSubscriptionCount > 7 ? "https://images-ext-1.discordapp.net/external/UdgGrUWl30eIb6ze3FC1wrzSTFkY7eJO3T8efmNzyJo/%3Fsize%3D44%26quality%3Dlossless/https/cdn.discordapp.com/emojis/1145029123266334851.webp?format=webp&width=88&height=88" : null })
        else role6 = await message.guild.roles.cache.get(req[0].h2).edit({ name: 'Brillance de la HypeSquad', color: '#f47b67', reason: 'Rôle pour le badge Brillance de la HypeSquad', icon: message.guild.premiumSubscriptionCount > 7 ? "https://images-ext-1.discordapp.net/external/UdgGrUWl30eIb6ze3FC1wrzSTFkY7eJO3T8efmNzyJo/%3Fsize%3D44%26quality%3Dlossless/https/cdn.discordapp.com/emojis/1145029123266334851.webp?format=webp&width=88&height=88" : null })
        if(!message.guild.roles.cache.get(req[0].h3)) role7 = await message.guild.roles.create({ name: 'Balance de la HypeSquad', color: '#45ddc0', reason: 'Rôle pour le badge Balance de la HypeSquad', icon: message.guild.premiumSubscriptionCount > 7 ? "https://cdn.discordapp.com/emojis/1145029123266334851.webp?size=44&quality=lossless" : null })
        else role7 = await message.guild.roles.cache.get(req[0].h3).edit({ name: 'Balance de la HypeSquad', color: '#45ddc0', reason: 'Rôle pour le badge Balance de la HypeSquad', icon: message.guild.premiumSubscriptionCount > 7 ? "https://cdn.discordapp.com/emojis/1145029123266334851.webp?size=44&quality=lossless" : null })
        if(!message.guild.roles.cache.get(req[0].bughunter1)) role8 = await message.guild.roles.create({ name: 'Chasseur de bugs Discord', color: '#3ba55c', reason: 'Rôle pour le badge Chasseur de bugs Discord', icon: message.guild.premiumSubscriptionCount > 7 ? "https://images-ext-1.discordapp.net/external/3G7tLT0GAe4z32F2CsDr8EcNzXAKPj6gIRt4ODJTq7s/%3Fsize%3D44%26quality%3Dlossless/https/cdn.discordapp.com/emojis/1219370552154918984.webp?format=webp&width=88&height=82" : null })
        else role8 = await message.guild.roles.cache.get(req[0].bughunter1).edit({ name: 'Chasseur de bugs Discord', color: '#3ba55c', reason: 'Rôle pour le badge Chasseur de bugs Discord', icon: message.guild.premiumSubscriptionCount > 7 ? "https://images-ext-1.discordapp.net/external/3G7tLT0GAe4z32F2CsDr8EcNzXAKPj6gIRt4ODJTq7s/%3Fsize%3D44%26quality%3Dlossless/https/cdn.discordapp.com/emojis/1219370552154918984.webp?format=webp&width=88&height=82" : null })
        if(!message.guild.roles.cache.get(req[0].bughunter2)) role9 = await message.guild.roles.create({ name: 'Chasseur de bugs Discord', color: '#ffd56c', reason: 'Rôle pour le badge Chasseur de bugs Discord', icon: message.guild.premiumSubscriptionCount > 7 ? "https://cdn.discordapp.com/emojis/1219370554608582658.webp?size=44&quality=lossless" : null })
        else role9 = await message.guild.roles.cache.get(req[0].bughunter2).edit({ name: 'Chasseur de bugs Discord', color: '#ffd56c', reason: 'Rôle pour le badge Chasseur de bugs Discord', icon: message.guild.premiumSubscriptionCount > 7 ? "https://cdn.discordapp.com/emojis/1219370554608582658.webp?size=44&quality=lossless" : null })
        if(!message.guild.roles.cache.get(req[0].activedev)) role10 = await message.guild.roles.create({ name: 'Développeur actif', color: '#2ea967', reason: 'Rôle pour le badge Développeur actif', icon: message.guild.premiumSubscriptionCount > 7 ? "https://cdn.discordapp.com/emojis/1145032264640647259.webp?size=44&quality=lossless" : null })
        else role10 = await message.guild.roles.cache.get(req[0].activedev).edit({ name: 'Développeur actif', color: '#2ea967', reason: 'Rôle pour le badge Développeur actif', icon: message.guild.premiumSubscriptionCount > 7 ? "https://cdn.discordapp.com/emojis/1145032264640647259.webp?size=44&quality=lossless" : null })
        if(!message.guild.roles.cache.get(req[0].developer)) role11 = await message.guild.roles.create({ name: 'Développeur de bot certifié de la première heure', color: '#5865f2', reason: 'Rôle pour le badge Développeur de bot certifié de la première heure', icon: message.guild.premiumSubscriptionCount > 7 ? "https://cdn.discordapp.com/emojis/1145032258508570634.webp?size=44&quality=lossless" : null })
        else role11 = await message.guild.roles.cache.get(req[0].developer).edit({ name: 'Développeur de bot certifié de la première heure', color: '#5865f2', reason: 'Rôle pour le badge Développeur de bot certifié de la première heure', icon: message.guild.premiumSubscriptionCount > 7 ? "https://cdn.discordapp.com/emojis/1145032258508570634.webp?size=44&quality=lossless" : null })
        if(!message.guild.roles.cache.get(req[0].premium)) role12 = await message.guild.roles.create({ name: 'Soutien de la première heure', color: '#9cb8ff', reason: 'Rôle pour le badge Soutien de la première heure', icon: message.guild.premiumSubscriptionCount > 7 ? "https://cdn.discordapp.com/emojis/1219370824537083914.webp?size=44&quality=lossless" : null })
        else role12 = await message.guild.roles.cache.get(req[0].premium).edit({ name: 'Soutien de la première heure', color: '#9cb8ff', reason: 'Rôle pour le badge Soutien de la première heure', icon: message.guild.premiumSubscriptionCount > 7 ? "https://cdn.discordapp.com/emojis/1219370824537083914.webp?size=44&quality=lossless" : null })

        await bot.db.query(`UPDATE utilitaire SET staff = "${role1.id}", partner = "${role2.id}", certifiedmod = "${role3.id}", hypesquad = "${role4.id}", h1 = "${role5.id}", h2 = "${role6.id}", h3 = "${role7.id}", bughunter1 = "${role8.id}", bughunter2 = "${role9.id}", activedev = "${role10.id}", developer = "${role11.id}", premium = "${role12.id}" WHERE guildId = ${message.guild.id}`);

        const embed = new Discord.EmbedBuilder()
        .setDescription(`**✅ Tous les rôles ont bien été configurés avec succès.**`)
        .setColor("Green")

        await message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
        await EmbedUtilitaire(bot, message, null, msg)
    })
}

async function manuellebadge(bot, message, interaction, msg, EmbedUtilitaire) {
    bot.db.query(`SELECT * FROM utilitaire WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        const flags = {
            Staff: req[0].staff,
            Partner: req[0].partner,
            BugHunterLevel1: req[0].bughunter1,
            BugHunterLevel2: req[0].bughunter2,
            Hypesquad: req[0].hypesquad,
            HypeSquadOnlineHouse2: req[0].h2,
            HypeSquadOnlineHouse1: req[0].h1,
            HypeSquadOnlineHouse3: req[0].h3,
            PremiumEarlySupporter: req[0].premium,
            VerifiedDeveloper: req[0].developer,
            ActiveDeveloper: req[0].activedev,
            CertifiedModerator: req[0].certifiedmod
        };

        const embed = new Discord.EmbedBuilder()
        .setColor('Blue')
        .setDescription(`**ℹ️ Mise à jour des rôles badges en cours...**`)

        await message.channel.send({ embeds: [embed]})

        await message.guild.members.cache.forEach(m => {
            const userFlag = m.user.flags.toArray() 
            
            userFlag.forEach((u) => {
                const role = message.guild.roles.cache.get(flags[u])
                if(role) {
                    m.roles.add(role.id)
                }
            })
        })

        const embed2 = new Discord.EmbedBuilder()
        .setColor('Green')
        .setDescription(`**✅ Mise à jour des rôles badges effectuée avec succès.**`)

        await message.channel.send({ embeds: [embed2]})
        await EmbedUtilitaire(bot, message, null, msg)
    })
}
module.exports = {
    confgiRole: configRole,
    manuelleBadge: manuellebadge,
};