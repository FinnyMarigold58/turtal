const { guilds } = require("../../db")

module.exports = {
    name: "verify",
    usage: "verify",
    description: "Verifys user in current server.",
    botPermissions: ["MANAGE_ROLES"],
    run: async (message, args, client) => {
        const guild = guilds.findOne({
            guildId: message.guild.id
        })
        const verifyRole = await message.guild.roles.resolve(guild.verifyRoleId)
        if (!verifyRole) {
            return message.reply({
                content: "Verify role not found please contact administrator."
            })
        }
        if (message.member.roles.cache.has(verifyRole.id)) {
            return message.reply({
                content: `You are already verified, ${message.member}!`
            })
        }
        message.member.roles.add(verifyRole).then((member) => {
            message.reply({
                content: "Verified!"
            })
        }).catch((error) => {
            message.reply({
                content: "An unexpected error has accured when giving member role. The developer has been notified."
            })
            console.error(error)
        })
    }
}