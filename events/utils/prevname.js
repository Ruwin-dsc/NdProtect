module.exports = {
    name: "userUpdate",
    async execute(oldUser, newUser, bot) {
        if(oldUser.username !== newUser.username) {  
            await bot.db.query(`SELECT * FROM prevname WHERE userId = "${newUser.id}"`, async (err, req) => {
                if(req.length < 1) bot.db.query(`INSERT INTO prevname (userId, timestamp) VALUES ("${newUser.id}", "${JSON.stringify({ timestamp: Math.floor(Date.now() / 1000), name: newUser.username}).replace(/"/g, '\\"')}")`)
                else {
                    const array = JSON.parse(req[0].prevname)
                    const json = {
                        timestamp: Math.floor(Date.now() / 1000),
                        name: newUser.username
                    }
                    array.push(json)
                    await bot.db.query(`UPDATE prevname SET prevname = "${JSON.stringify(array).replace(/"/g, '\\"')}" WHERE userId = ${newUser.id}`);
                }   
        })
    }
  }};
