const { UserSettings, User } = require('../models/models');

let message1 = null
let message2 = null
let message3 = null
let message4 = null

async function Settings(bot, chatId, user) {
	try {
		bot.removeListener('callback_query');
		const UserSett = await UserSettings.findOne({ where: { userId: user.dataValues.id } });
		const Sett = [
			'Текущие настройки:\n',
			`Модуль: ${UserSett.dataValues.model}`,
			`Размер картинки: ${UserSett.dataValues.width} x ${UserSett.dataValues.height}`,
			`\nЦена картинки: ${UserSett.dataValues.Cost}`
		];
		const paragraphs = [
			'Модель определяет тип картинки более реалистичная или анимешная, фури или картина маслом. Тут можно разгуляться на широкую ногу :)',
			'Размер влияет на скорость создания, а также качество картинки',
		];
		message1 = await bot.sendMessage(chatId, Sett.join('\n'));
		message2 = await bot.sendMessage(chatId, paragraphs.join('\n\n'), comandButton);


		bot.on('callback_query', async msg => {
			const data = msg.data;
			if (data == 'model') {
				await bot.deleteMessage(chatId, message1.message_id);
				await bot.deleteMessage(chatId, message2.message_id);
				message3 = await bot.sendMessage(chatId, `Модель`, model);
			} else if (data == 'Size') {
				await bot.deleteMessage(chatId, message1.message_id);
				await bot.deleteMessage(chatId, message2.message_id);
				message4 = await bot.sendMessage(chatId, `Размер картинки`, Size);
			}
		});


		bot.on('callback_query', async msg => {
			const data = msg.data;
			if (data == 'Vibrance') {
				await bot.deleteMessage(chatId, message3.message_id);
				await SetModel('Vibrance')
			} else if (data == 'Akasha') {
				await bot.deleteMessage(chatId, message3.message_id);
				await SetModel('Akasha')
			} else if (data == 'Furry') {
				await bot.deleteMessage(chatId, message3.message_id);
				await SetModel('Furry')
			} else if (data == 'Aika') {
				await bot.deleteMessage(chatId, message3.message_id);
				await SetModel('Aika')
			} else if (data == 'Tranquility') {
				await bot.deleteMessage(chatId, message3.message_id);
				await SetModel('Tranquility')
			} else if (data == 'Yami') {
				await bot.deleteMessage(chatId, message3.message_id);
				await SetModel('Yami')
			}
		});
		bot.on('callback_query', async msg => {
			const data = msg.data;
			if (data == '512 x 512') {
				await bot.deleteMessage(chatId, message4.message_id);
				await SetSize('512', '512', 5)
			} else if (data == '768 x 768') {
				await bot.deleteMessage(chatId, message4.message_id);
				await SetSize('768', '768', 9)
			} else if (data == '1152 x 1152') {
				await bot.deleteMessage(chatId, message4.message_id);
				await SetSize('1152', '1152', 21)
			} else if (data == '512 x 768') {
				await bot.deleteMessage(chatId, message4.message_id);
				await SetSize('512', '768', 7)
			} else if (data == '768 x 1152') {
				await bot.deleteMessage(chatId, message4.message_id);
				await SetSize('768', '1152', 13)
			} else if (data == '768 x 512') {
				await bot.deleteMessage(chatId, message4.message_id);
				await SetSize('768', '512', 7)
			} else if (data == '1152 x 768') {
				await bot.deleteMessage(chatId, message4.message_id);
				await SetSize('1152', '768', 13)
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
		bot.sendMessage(chatId, 'Настройки успешно применены.')
		bot.removeListener('callback_query');
	}
	async function SetSize(width, height, Cost) {
		await UserSettings.update(
			{ width: width, height: height, Cost: Cost },
			{ where: { userId: user.dataValues.id } }
		);
		bot.sendMessage(chatId, 'Настройки успешно применены.')
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
				{ text: 'Аниме: обычное', callback_data: 'Akasha' },
			],
			[
				{ text: 'Фурри', callback_data: 'Furry' },
				{ text: 'Эстетическое аниме', callback_data: 'Aika' },
			],
			[
				{ text: 'Спокойствие', callback_data: 'Tranquility' },
				{ text: 'Альтернативное аниме', callback_data: 'Yami' },
			]
		],
	}),
};
const Size = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[
				{ text: '512 x 512(Квадратная)', callback_data: '512 x 512' },
			],
			[
				{ text: '768 x 768(Квадратная)', callback_data: '768 x 768' },
				{ text: '1152 x 1152(Квадратная)', callback_data: '1152 x 1152' },
			],
			[
				{ text: '512 x 768(Портретная)', callback_data: '512 x 768' },
				{ text: '768 x 1152(Портретная)', callback_data: '768 x 1152' },
			],
			[
				{ text: '768 x 512(Альбомная)', callback_data: '768 x 512' },
				{ text: '1152 x 768(Пейзажная)', callback_data: '1152 x 768' },
			],
		],
	}),
};

module.exports = {
	Settings,
};
