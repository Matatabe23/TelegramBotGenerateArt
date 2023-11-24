const { UserSettings, User } = require('../models/models');


async function Settings(bot, chatId, user) {
	try {
		bot.removeListener('callback_query');
		const UserSett = await UserSettings.findOne({ where: { userId: user.dataValues.id } });
		const Sett = [
			'Текущие настройки:\n',
			`Модуль: ${UserSett.dataValues.model}`,
			`Размер картинки: ${UserSett.dataValues.width} x ${UserSett.dataValues.height}`,
		];
		const paragraphs = [
			'Модель определяет тип картинки более реалистичная или анимешная, фури или картина маслом. Тут можно разгуляться на широкую ногу :)',
			'Размер влияет на скорость создания, а также качество картинки',
		];
		await bot.sendMessage(chatId, Sett.join('\n'));
		await bot.sendMessage(chatId, paragraphs.join('\n\n'), comandButton);


		bot.on('callback_query', msg => {
			const data = msg.data;
			if (data == 'model') {
				bot.sendMessage(chatId, `Модель`, model);
			} else if (data == 'Size') {
				bot.sendMessage(chatId, `Размер картинки`, Size);
			}
		});


		bot.on('callback_query', async msg => {
			const data = msg.data;
			if (data == 'Vibrance') {
				SetModel('Vibrance')
			} else if (data == 'Akasha: Anime') {
				SetModel('Akasha: Anime')
			} else if (data == 'Furry') {
				SetModel('Furry')
			} else if (data == 'Aesthetic Anime') {
				SetModel('Aesthetic Anime')
			} else if (data == 'Tranquility') {
				SetModel('Tranquility')
			} else if (data == 'Alternative Anime') {
				SetModel('Alternative Anime')
			}
		});
		bot.on('callback_query', async msg => {
			const data = msg.data;
			if (data == '512 x 512') {
				SetSize('512', '512')
			} else if (data == '512 x 768') {
				SetSize('512', '768')
			} else if (data == '768 x 768') {
				SetSize('768', '768')
			} else if (data == '1152 x 1152') {
				SetSize('1152', '1152')
			}
		});
	} catch (e) {
		console.log(e)
	}

	async function SetModel(NameModel) {
		await UserSettings.update(
			{ model: NameModel },
			{ where: { userId: user.dataValues.id } }
		);
		bot.sendMessage(chatId, 'Настройки успешно применяны.')
		bot.removeListener('callback_query');
	}
	async function SetSize(width, height) {
		await UserSettings.update(
			{ width: width, height: height },
			{ where: { userId: user.dataValues.id } }
		);
		bot.sendMessage(chatId, 'Настройки успешно применяны.')
		bot.removeListener('callback_query');
	}
}

const comandButton = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[
				{ text: 'Модель', callback_data: 'model' },
				{ text: 'Размер картинки', callback_data: 'Size' },
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

module.exports = {
	Settings,
};
