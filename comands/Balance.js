function Balance(bot, chatId) {
	bot.sendMessage(chatId, `Семпай у тебя на счету: ${chatId}`)
}

module.exports = {
	Balance
}