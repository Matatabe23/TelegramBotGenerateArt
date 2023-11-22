function pay(bot, chatId) {
	const paragraphs = [
		'Генерация 1 картинки стоит 6 кристаллов в формате 512 х 768. В будущем будут добавлены дополнительный форматы картинок, а так же более расширенные настройки.',
    'Стоимость кристаллов:',
		'50 кристаллов = 25 рублей',
		'100 кристаллов = 45 рублей(Скидка 10%)',
		'500 кристаллов = 200 рублей(Скидка 20%)',
		'1000 кристаллов = 400 рублей(Скидка 20%)',
  ];
	bot.sendMessage(chatId, paragraphs.join('\n\n'));
	setTimeout(() => {
		bot.sendMessage(chatId, `Семпай, выбери способ оплаты`, comandButton);
	}, 100)

  bot.on('callback_query', msg => {
    const data = msg.data;
    if (data == 'bank') {
      bot.sendMessage(chatId, `Банковская карта`, Price);
    } else if (data == 'qiwi') {
      bot.sendMessage(chatId, `Qiwi`, Price);
    }
    bot.removeListener('callback_query');
  });
}

const comandButton = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: 'Qiwi', callback_data: 'qiwi' },
        { text: 'Банковская карта', callback_data: 'bank' },
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
