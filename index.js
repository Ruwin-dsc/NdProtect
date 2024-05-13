const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildBans], partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction, Partials.ThreadMember, Partials.GuildScheduledEvent] });
bot.setMaxListeners(70)
const config = require("./config.json")

bot.slashcommand = new Collection();
bot.commands = new Collection();
bot.aliases = new Collection();
bot.snipes = new Collection();
bot.config = config
bot.emoji = require("./utils/emoji.json")

require('./handlers/loadslashcommand.js')(bot);
require('./handlers/command.js')(bot);
require('./handlers/event.js')(bot);
require("./handlers/loadDatabase");
const DataBase = require("./handlers/loginDatabase");
DataBase.connectDatabase(bot);

const noerr = [10062, 40060, 50001, 50013, 10008]
process.on('unhandledRejection', (reason, p) => {
    if(noerr.includes(reason.code)) return
    console.log(' [antiCrash] :: Unhandled Rejection/Catch');
    console.log(reason, p);
});
process.on('uncaughtException', (err, origin) => {
    if(noerr.includes(err.code)) return
    console.log(' [antiCrash] :: Uncaught Exception/Catch');
    console.log(err, origin);
}) 
process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)');
    console.log(err, origin);
});
bot.login(config.token)

