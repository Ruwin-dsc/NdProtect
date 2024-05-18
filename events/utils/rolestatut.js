const Discord = require('discord.js')

module.exports = {
  name: "presenceUpdate",
  async execute(oldPresence, newPresence, bot) {
    if(!newPresence.guild) return
    bot.db.query(`SELECT * FROM utilitaire WHERE guildId = "${newPresence.guild.id}"`, async (err, req) => {
        if(req.length < 1 || req[0].statutrole == "off") return
        if (!newPresence.guild || !newPresence.member) return;
        const role = newPresence.member.guild.roles.cache.get(req[0].rolestatut);
        if (newPresence.member.presence.activities.some(activity => activity.type === 4 && activity.state && activity.state.includes(req[0].statut))) {
            if (role && !newPresence.member.roles.cache.has(req[0].rolestatut)) 
                newPresence.member.roles.add(role)
        } else {
            if (role && newPresence.member.roles.cache.has(req[0].rolestatut)) {
                newPresence.member.roles.remove(role)
            }
        }
    })
}}
