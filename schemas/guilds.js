const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    guildId: { type: String, required: true },
    prefix: { type: String, required: true, default: ";"},
    verifyRoleId: { type: String } 
})

module.exports = mongoose.model(`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`, schema)