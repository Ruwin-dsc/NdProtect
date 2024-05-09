const fs = require("fs");

module.exports = async (bot) => {
  fs.readdirSync("./slashcommands")
    .filter((f) => f.endsWith(".js"))
    .forEach(async (file) => {
      let command = require(`../slashcommands/${file}`);
      if (!command.name || typeof command.name !== "string")
        throw new TypeError(
          `La commande ${file.slice(0, file.length - 3)} n'a pas de nom !`
        );
      bot.slashcommand.set(command.name, command);
      console.log(`Commande ${file} chargée avec succés !`);
    });
};
