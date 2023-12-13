const TelegramApi = require('node-telegram-bot-api');
const bot = new TelegramApi(process.env.token, { polling: true })
const { User } = require('../models/models')
const { UserSettings } = require('../models/models')

const { Start } = require('../comandsBot/Start')
const { Balance } = require('../comandsBot/Balance')
const { Help } = require('../comandsBot/Help')
const { Generate } = require('../comandsBot/Generate')
const { pay } = require('../comandsBot/pay')
const { usagePolicy } = require('../comandsBot/usagePolicy')
const { Examples } = require("../comandsBot/Examples")
const { Settings } = require('../comandsBot/Settings')
const { PrivacyPolicy } = require('../comandsBot/PrivacyPolicy')
const { support } = require('../comandsBot/support')

const commands = [
	{ command: '/start', description: 'Начать' },
	{ command: '/pay', description: 'Пополнить счет' },
	{ command: '/help', description: 'Помощь' },
	{ command: '/balance', description: 'Баланс' },
	{ command: '/generate', description: 'Генерировать картинки' },
	{ command: '/settings', description: 'Настройки' },
	{ command: '/usagepolicy', description: 'Политика использования' },
	{ command: '/privacypolicy', description: 'Политика конфиденциальности' },
	{ command: '/examples', description: 'Примеры работ' },
	{ command: '/support', description: 'Техническая поддержка' },
]

bot.setMyCommands(commands).then(() => {
	console.log('Команды успешно установлены');
}).catch((error) => {
	console.error('Ошибка при установке команд:', error.message);
});

bot.on('message', async msg => {
	const name = msg.from.first_name; // Отображаемое имя
	const sistemName = msg.from.username; //Имя для поиска в телеграмме 
	const chatId = msg.chat.id; //Айди чата
	const UserId = msg.from.id //Айди пользователя
	const text = msg.text; //Текст

	const user = await User.findOne({ where: { idTelegram: UserId } });
	console.log(user)
	if (!user) {
		await User.create({
			idTelegram: UserId,
			name: name,
			sistemName: sistemName
		})
	} else {
		const UserSett = await UserSettings.findOne({ where: { userId: user.dataValues.id } });
		if (!UserSett) {
			await UserSettings.create({
				model: 'Vibrance',
				width: '512',
				height: '768',
				Cost: '7',
				userId: user.dataValues.id,
			});
		}
	}

	if (text === '/start') {
		Start(bot, chatId, name, UserId, sistemName)
	}
	else if (text === '/balance') {
		Balance(bot, chatId, UserId)
	}
	else if (text === '/help') {
		Help(bot, chatId)
	}
	else if (text && text.startsWith('/generate')) {
		Generate(bot, chatId, user, text);
	}
	else if (text === '/pay') {
		pay(bot, chatId, text, user)
	}
	else if (text === '/usagepolicy') {
		usagePolicy(bot, chatId)
	}
	else if (text === '/examples') {
		Examples(bot, chatId, UserId)
	}
	else if (text === '/settings') {
		Settings(bot, chatId, user)
	}
	else if (text === '/privacypolicy') {
		PrivacyPolicy(bot, chatId)
	}
	else if (text === '/support') {
		support(bot, chatId)
	}
})