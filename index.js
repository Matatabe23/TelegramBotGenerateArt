require('dotenv').config()
const TelegramApi = require('node-telegram-bot-api');
const sequelize = require('./')
const models = require('./models/models')
const bot = new TelegramApi(process.env.token, { polling: true })

const { Start } = require('./comands/Start')
const { Balance } = require('./comands/Balance')
const { Help } = require('./comands/Help')
const { Generate } = require('./comands/Generate')

const commands = [
	{ command: '/start', description: 'Начать' },
	{ command: '/help', description: 'Помощь' },
	{ command: '/balance', description: 'Баланс' },
	{ command: '/generate', description: 'Генерировать картинки' },
];

bot.setMyCommands(commands).then(() => {
	console.log('Команды успешно установлены');
}).catch((error) => {
	console.error('Ошибка при установке команд:', error.message);
});

// const comandButton = {
// 	reolay_markup: JSON.stringify({
// 		inline_keyboard: [
// 			[{text: 'Текст кнопки'}],
// 		]
// 	})
// }

let generateComand = false

bot.on('message', async msg => {
	const name = msg.from.first_name;
	const sistemName = msg.from.username;
	const chatId = msg.chat.id;
	const text = msg.text;


	if (text === '/start') {
		Start(bot, chatId, name)
		generateComand = false
	}
	
	else if (text === '/balance') {
		Balance(bot, chatId)
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
	
	else {
		bot.sendMessage(chatId, 'Семпай, я не понимаю')
	}
})