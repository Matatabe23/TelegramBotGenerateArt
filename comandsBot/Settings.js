function Settings(bot, chatId) {
	const paragraphs = [
		'Модель определяет тип картинки более реалистичная или анимешная, фури или картина маслом. Тут можно разгуляться на широкую ногу :)',
		'Размер вляет на скорость создания, а так же качество картинки',
		'Шаги: количество шагов, которые модель изображения использует при создании изображения. Детализация изображения увеличивается с увеличением количества шагов, но в какой-то момент она станет подавляющей.',
		'Масштаб: Масштаб определяет, насколько изображение будет похоже на вашу подсказку. Более высокие масштабы делают изображение более похожим на то, что вы печатаете, но это также может привести к ухудшению качества изображения.'
	];
	bot.sendMessage(chatId, paragraphs.join('\n\n'), comandButton);

	bot.on('callback_query', msg => {
		const data = msg.data;
		if (data == 'model') {
			bot.sendMessage(chatId, `Модель`, model);
		} else if (data == 'Size') {
			bot.sendMessage(chatId, `Размер картинки`, Size);
		} else if (data == 'Steps') {
			bot.sendMessage(chatId, `Шаги`, Steps);
		} else if (data == 'Scale') {
			bot.sendMessage(chatId, `Шкала`, Scale);
		}

		bot.removeListener('callback_query');
	});
}






const comandButton = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[
				{ text: 'Модель', callback_data: 'model' },
				{ text: 'Размер картинки', callback_data: 'Size' },
				{ text: 'Шаги', callback_data: 'Steps' },
				{ text: 'Шкала', callback_data: 'Scale' },
			],
		],
	}),
};

const model = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[
				{ text: 'Аниме: реалистичное', callback_data: 'Vibrance' },
				{ text: 'Аниме: обычное', callback_data: 'Akasha: Anime' },
			],
			[
				{ text: 'Фурри', callback_data: 'Furry' },
				{ text: 'Эстетическое аниме', callback_data: 'Aesthetic Anime' },
			],
			[
				{ text: 'Спокойствие', callback_data: 'Tranquility' },
				{ text: 'Альтернативное аниме', callback_data: 'Alternative Anime' },
			]
		],
	}),
};
const Size = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[
				{ text: '512 x 512', callback_data: '512 x 512' },
				{ text: '512 x 768', callback_data: '512 x 768' },
			],
			[
				{ text: '768 x 768', callback_data: '768 x 768' },
				{ text: '1152 x 1152', callback_data: '1152 x 1152' },
			],
		],
	}),
};
const Steps = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[
				{ text: '10', callback_data: 'Steps10' },
				{ text: '16', callback_data: 'Steps16' },
				{ text: '22', callback_data: 'Steps22' },
				{ text: '28', callback_data: 'Steps28' },
				{ text: '30', callback_data: 'Steps30' },
			],
		],
	}),
};
const Scale = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[
				{ text: '3', callback_data: 'Scale3' },
				{ text: '7', callback_data: 'Scale7' },
				{ text: '12', callback_data: 'Scale12' },
				{ text: '16', callback_data: 'Scale16' },
				{ text: '20', callback_data: 'Scale20' },
			],
		],
	}),
};

module.exports = {
	Settings,
};
