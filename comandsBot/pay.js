async function pay(bot, chatId) {
	bot.removeListener('callback_query');
	const paragraphs = [
		'Генерация 1 картинки будет стоить в зависимости от настроек которые ты задашь. Для изменения настроек картинки напиши /settings. Там же будет указанна цена в кристаллах после изменнеия настроек.',
		'Стоимость кристаллов:',
		'50 кристаллов = 25 рублей',
		'100 кристаллов = 45 рублей(Скидка 10%)',
		'500 кристаллов = 200 рублей(Скидка 20%)',
		'1000 кристаллов = 400 рублей(Скидка 20%)',
	];
	await bot.sendMessage(chatId, paragraphs.join('\n\n'));
	await bot.sendMessage(chatId, `Семпай, ты готов к покупке?`, comandButton);

	bot.on('callback_query', msg => {
		const data = msg.data;
		if (data == 'bank') {
			bot.sendMessage(chatId, `Банковская карта`, Price);
		}
	});
}

const comandButton = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[
				{ text: 'Оплатить', callback_data: 'bank' },
			],
		],
	}),
};

const Price = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[
				{ text: '50 кристаллов', callback_data: '50' },
				{ text: '100 кристаллов', callback_data: '100' },
				{ text: '500 кристаллов', callback_data: '500' },
				{ text: '1000 кристаллов', callback_data: '1000' },
				{ text: '5000 кристаллов', callback_data: '5000' },
			],
		],
	}),
};

module.exports = {
	pay,
};
