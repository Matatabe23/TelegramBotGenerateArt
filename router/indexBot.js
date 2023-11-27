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

const commands = [
	{ command: '/start', description: 'Начать' },
	{ command: '/pay', description: 'Пополнить счет' },
	{ command: '/help', description: 'Помощь' },
	{ command: '/balance', description: 'Баланс' },
	{ command: '/generate', description: 'Генерировать картинки' },
	{ command: '/settings', description: 'Настройки' },
	{ command: '/usagepolicy', description: 'Политика использования' },
	{ command: '/examples', description: 'Примеры работ' },
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
	if (!user) {
		const user = await User.create({
			idTelegram: UserId,
			name: name,
			sistemName: sistemName
		})
	} else {
		const UserSett = await UserSettings.findOne({ where: { userId: user.dataValues.id } });
		if (!UserSett) {
			const userSettings = await UserSettings.create({
				model: 'Vibrance',
				width: '512',
				height: '768',
				userId: user.dataValues.id,
			});
		}
	}

	console.log(user)

	if (text === '/start') {
		Start(bot, chatId, name, UserId, sistemName)
	}
	else if (text === '/balance') {
		Balance(bot, chatId, UserId)
	}
	else if (text === '/help') {
		Help(bot, chatId)
	}
	else if (text.startsWith('/generate')) {
		Generate(bot, chatId, user, text)
	}
	else if (text === '/pay') {
		pay(bot, chatId, text)
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

	else {
		bot.sendMessage(chatId, 'Семпай, я не понимаю')
	}
})