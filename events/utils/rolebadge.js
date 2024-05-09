const Discord = require('discord.js')

module.exports = {
  name: "guildMemberAdd",
  async execute(member, bot) {
    bot.db.query(`SELECT * FROM utilitaire WHERE guildId = "${member.guild.id}"`, async (err, req) => {
        if(req.length < 1 || req[0].badgerole == "off") return
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
        (await member.user.fetchFlags()).toArray().forEach((r) =>{
            const role = member.guild.roles.cache.get(flags[r])
            if(role) member.roles.add(role.id)
        })

    })
  }
}