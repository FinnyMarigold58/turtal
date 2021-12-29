module.exports = {
    name: "purge",
    usage: "purge [number]",
    description: "Clears a certain number of unpinned messages",
    userPermissions: ["MANAGE_MESSAGES"],
    botPermissions: ["MANAGE_MESSAGES"],
    run: async (message, args, client) => {
        if (isNaN(args[0])) return message.reply({ content: "Please provide a valid number."})
        let num = Number(args[0])
        let messages = await message.channel.messages.fetch({ limit: num+1 }).then(messages => messages.filter(message => !message.pinned))
        message.channel.bulkDelete(messages, true)
    }
}