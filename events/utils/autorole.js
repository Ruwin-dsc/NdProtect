const Discord = require('discord.js')

module.exports = {
  name: "guildMemberAdd",
  async execute(member, bot) {
    bot.db.query(`SELECT * FROM bienvenue WHERE guildId = "${member.guild.id}"`, async (err, req) => {
        if (err || req.length < 1) return; 
        if(req[0].bvn == "on") {
            const bvnRole = JSON.parse(req[0].bvnRole)
            if(bvnRole.length == 0) return
            bvnRole.forEach(r => {
                member.roles.add(r)
            })
        }
        if(req[0].ghostping == "on") {
            const ghostpingchannel = JSON.parse(req[0].ghostpingchannel)
            if(ghostpingchannel.length == 0) return
            ghostpingchannel.forEach(c => {
                const channel = member.guild.channels.cache.get(c)
                if(channel) channel.send(`Bienvenue <@${member.id}> !`).then(m => setTimeout(() => { m.delete() }, 5000 ))
            })
        }
     })
  }
}