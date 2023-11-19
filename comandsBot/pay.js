function pay(bot, chatId) {
	bot.sendMessage(chatId, `Семпай, выбери способ оплаты`, comandButton)


	bot.on('callback_query', msg => {
		console.log(msg)
	})
}

const comandButton = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[
				{ text: 'Qiwi', callback_data: 'qiwi' },
				{ text: 'Банковская карта', callback_data: 'bank' },
			],
		]
	})
}

module.exports = {
	pay
}