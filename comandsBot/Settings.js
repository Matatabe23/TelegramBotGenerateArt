const { UserSettings } = require('../models/models')
const { User } = require('../models/models')

async function Settings(bot, chatId, UserId) {
	const USER = await User.findOne({ idTelegram: UserId})
	const UserSett = await UserSettings.findOne({ where: { userId: UserId } });
	console.log(UserSett)
	let modeles = 'Vibrance'
	let widths = '512'
	let heights = '768'
	let Steps = '28'
	let Scales = '12'
	const paragraphs = [
		'Модель определяет тип картинки более реалистичная или анимешная, фури или картина маслом. Тут можно разгуляться на широкую ногу :)',
		'Размер вляет на скорость создания, а так же качество картинки',
		'Шаги: количество шагов, которые модель изображения использует при создании изображения. Детализация изображения увеличивается с увеличением количества шагов, но в какой-то момент она станет подавляющей.',
		'Масштаб: Масштаб определяет, насколько изображение будет похоже на вашу подсказку. Более высокие масштабы делают изображение более похожим на то, что вы печатаете, но это также может привести к ухудшению качества изображения.',
	];
	const SettingsInfo = [
		'Настройки сейчас:\n',
		`Модель: ${modeles}`,
		`Размер: ${widths} x ${heights}`,
		`Шаги ${Steps}`,
		`Шкала ${Scales}`
	]
	bot.sendMessage(chatId, SettingsInfo.join('\n'));
	setTimeout(() => {
		bot.sendMessage(chatId, paragraphs.join('\n\n'), comandButton);
	}, 100)


	bot.on('callback_query', msg => {
		const data = msg.data;
		if (data == 'model') {
			bot.sendMessage(chatId, `Модель`, model);
		} else if (data == 'Size') {
			bot.sendMessage(chatId, `Размер картинки`, Size);
		} else if (data == 'Step') {
			bot.sendMessage(chatId, `Шаги`, Step);
		} else if (data == 'Scale') {
			bot.sendMessage(chatId, `Шкала`, Scale);
		}
		// bot.removeListener('callback_query');
	});

	bot.on('callback_query', msg => {
		const data = msg.data;
		if (data == 'Vibrance') {
			modeles = 'Vibrance';
			createUserSettings(UserId, USER,  UserSett, modeles, widths, heights, Steps, Scales); // Сохранение настроек пользователя
			bot.removeListener('callback_query');
		} else if (data == 'Akasha: Anime') {
			modeles = 'Akasha: Anime';
			createUserSettings(UserId, USER,  UserSett, modeles, widths, heights, Steps, Scales); // Сохранение настроек пользователя
			bot.removeListener('callback_query');
		} else if (data == 'Furry') {
			modeles = 'Furry';
			createUserSettings(UserId, USER,  UserSett, modeles, widths, heights, Steps, Scales); // Сохранение настроек пользователя
			bot.removeListener('callback_query');
		} else if (data == 'Aesthetic Anime') {
			modeles = 'Aesthetic Anime';
			createUserSettings(UserId, USER,  UserSett, modeles, widths, heights, Steps, Scales); // Сохранение настроек пользователя
			bot.removeListener('callback_query');
		} else if (data == 'Tranquility') {
			modeles = 'Tranquility';
			createUserSettings(UserId, USER,  UserSett, modeles, widths, heights, Steps, Scales); // Сохранение настроек пользователя
			bot.removeListener('callback_query');
		} else if (data == 'Alternative Anime') {
			modeles = 'Alternative Anime';
			createUserSettings(UserId, USER,  UserSett, modeles, widths, heights, Steps, Scales); // Сохранение настроек пользователя
			bot.removeListener('callback_query');
		}
	});


	bot.on('callback_query', msg => {
		const data = msg.data;
		if (data == '512 x 512') {
			widths = '512'
			heights = '512'
			bot.removeListener('callback_query');
		} else if (data == '512 x 768') {
			widths = '512'
			heights = '768'
			bot.removeListener('callback_query');
		} else if (data == '768 x 768') {
			widths = '768'
			heights = '768'
			bot.removeListener('callback_query');
		} else if (data == '1152 x 1152') {
			widths = '1152'
			heights = '1152'
			bot.removeListener('callback_query');
		}
	});

	bot.on('callback_query', msg => {
		const data = msg.data;
		if (data == 'Step10') {
			Steps = 10
			bot.removeListener('callback_query');
		} else if (data == 'Step16') {
			Steps = 16
			bot.removeListener('callback_query');
		} else if (data == 'Step22') {
			Steps = 22
			bot.removeListener('callback_query');
		} else if (data == 'Step28') {
			Steps = 28
			bot.removeListener('callback_query');
		} else if (data == 'Step30') {
			Steps = 30
			bot.removeListener('callback_query');
		}
	});

	bot.on('callback_query', msg => {
		const data = msg.data;
		if (data == 'Scale3') {
			Scales = '3'
			bot.removeListener('callback_query');
		} else if (data == 'Scale7') {
			Scales = '7'
			bot.removeListener('callback_query');
		} else if (data == 'Scale12') {
			Scales = '12'
			bot.removeListener('callback_query');
		} else if (data == 'Scale16') {
			Scales = '16'
			bot.removeListener('callback_query');
		} else if (data == 'Scale20') {
			Scales = '20'
			bot.removeListener('callback_query');
		}
	});
}

const createUserSettings = async (UserId, USER, UserSett, model, width, height, steps, scale) => {
	const userId = USER.dataValues.id
	if (!UserSett) {
		try {
			const userSettings = await UserSettings.create({
				model: model,
				width: width,
				height: height,
				steps: steps,
				scale: scale,
				userId: userId, // Привязка к пользователю
			});
			console.log('User settings created:');
		} catch (error) {
			console.error('Error creating user settings:', error);
		}
	}
	else {
		
	}
}






const comandButton = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[
				{ text: 'Модель', callback_data: 'model' },
				{ text: 'Размер картинки', callback_data: 'Size' },
				{ text: 'Шаги', callback_data: 'Step' },
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
const Step = {
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
