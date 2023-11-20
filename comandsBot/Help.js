function Help(bot, chatId) {
	bot.sendMessage(chatId, `Пополнить счет: /pay`)
	setTimeout(() => {
		bot.sendMessage(chatId, `Узнать баланс: /balance`)
	}, 100);
	setTimeout(() => {
		bot.sendMessage(chatId, `Сгенерировать картинку: /generate.`)
	}, 200);
	setTimeout(() => {
		bot.sendMessage(chatId, `Что бы картинка была приближенна к задуманному результату, применяй данные советы: 'Используй английский язык, пиши критерии через запятую(Cat girl, black heir, red eyes...)'`)
	}, 300);
}

module.exports = {
	Help
}