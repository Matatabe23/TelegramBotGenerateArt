function pay(bot, chatId) {
	bot.sendMessage(chatId, `Семпай, выбери способ оплаты`, comandButton)


	bot.on('callback_query', msg => {
		bot.sendMessage(chatId, msg.data)
		// const data = msg.data
		// if (data == 'qiwi') {
		// 	bot.sendMessage(chatId, `qiwi`)
		// } else if (data == 'bank') {
		// 	bot.sendMessage(chatId, `bank`)
		// }
		bot.removeListener('callback_query')
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