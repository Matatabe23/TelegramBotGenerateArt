function Start(bot, chatId, name) {
	bot.sendChatAction(chatId, 'typing');
	bot.sendMessage(chatId, `Привет, ${name}! Я очень рада тебя видеть!`)
	setTimeout(() => {
		bot.sendMessage(chatId, `Я умею генерировать любые аниме картинки. Вот тебе пример:`)
	}, 2000)
	setTimeout(() => {
		bot.sendPhoto(chatId, './arts/8a3cdc26-9963-4105-9ddd-ae206a7534a3.jpg', { caption: 'Пример описания: taihourq, solo, looking at viewer, large breasts, standing, black bikini, multi-strapped bikini, thigh strap, red jacket, thigh strap, perfect anatomy, perfect fingers,' })
	}, 4000)
	setTimeout(() => {
		bot.sendMessage(chatId, 'Описывай персонажа четко для получения нужного тебе результата. Лучше всего описание делать на английском языке.')
	}, 6000)
	setTimeout(() => {
		bot.sendMessage(chatId, 'Используй такие команды как /balance и /help для получения большей инфомарции')
	}, 8000)
}

module.exports = {
	Start
}