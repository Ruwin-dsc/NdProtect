const Discord = require("discord.js");
const config = require('../../config.json')
module.exports = {
    name: "messageReactionRemove",
    async execute(reaction, user, bot) {
        await bot.db.query(`SELECT * FROM rolereact WHERE guildId = "${reaction.message.guildId}" AND messageId = "${reaction.message.id}"`, async (err, req) => {
            if(req.length < 1) return
            if(reaction.emoji.id == req[0].emoji && reaction.message.channelId == req[0].channelId) {
                const member = bot.guilds.cache.get(reaction.message.guildId).members.cache.get(user.id)
                if(member) {
                    member.roles.remove(req[0].roleId)
                }
            }
        })
    }
}