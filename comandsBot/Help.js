async function Help(bot, chatId) {
	await bot.sendMessage(chatId, `Пополнить счет: /pay`)
	await bot.sendMessage(chatId, `Узнать баланс: /balance`)
	await bot.sendMessage(chatId, `Сгенерировать картинку: /generate Ваше описание.`)
	await bot.sendMessage(chatId, `Что бы картинка была приближенна к задуманному результату, применяй данные советы: 'Используй английский язык, пиши критерии через запятую(Cat girl, black heir, red eyes...)'`)
}

module.exports = {
	Help
}