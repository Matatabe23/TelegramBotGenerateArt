const TelegramApi = require('node-telegram-bot-api');
const bot = new TelegramApi(process.env.token, { polling: true })

const { Start } = require('../comandsBot/Start')
const { Balance } = require('../comandsBot/Balance')
const { Help } = require('../comandsBot/Help')
const { Generate } = require('../comandsBot/Generate')
const { pay } = require('../comandsBot/pay')
const { usagePolicy } = require('../comandsBot/usagePolicy')
const { Examples } = require("../comandsBot/Examples")

const commands = [
	{ command: '/start', description: 'Начать' },
	{ command: '/pay', description: 'Пополнить счет' },
	{ command: '/help', description: 'Помощь' },
	{ command: '/balance', description: 'Баланс' },
	{ command: '/generate', description: 'Генерировать картинки' },
	{ command: '/usagepolicy', description: 'Политика использования' },
	{ command: '/examples', description: 'Примеры работ' },
];

bot.setMyCommands(commands).then(() => {
	console.log('Команды успешно установлены');
}).catch((error) => {
	console.error('Ошибка при установке команд:', error.message);
});

let generateComand = false

bot.on('message', async msg => {
	const name = msg.from.first_name; // Отображаемое имя
	const sistemName = msg.from.username; //Имя для поиска в телеграмме 
	const chatId = msg.chat.id; //Айди чата
	const UserId = msg.from.id //Айди пользователя
	const text = msg.text; //Текст


	if (text === '/start') {
		Start(bot, chatId, name, UserId, sistemName)
		generateComand = false
	}
	
	else if (text === '/balance') {
		Balance(bot, chatId, UserId)
		generateComand = false
	}
	
	else if (text === '/help') {
		Help(bot, chatId)
		generateComand = false
	} 
	
	else if (text === '/generate') {
		generateComand = true
		bot.sendMessage(chatId, 'Опиши картинку которую ты хочешь получить')
	} 

	else if (generateComand == true) {
		Generate(bot, chatId, text)
	} 

	else if (text === '/pay') {
		pay(bot, chatId, text)
	} 

	else if (text === '/usagepolicy') {
		usagePolicy(bot, chatId)
	} 
	else if (text === '/examples'){
		Examples(bot, chatId)
	}
	
	else {
		bot.sendMessage(chatId, 'Семпай, я не понимаю')
	}
})