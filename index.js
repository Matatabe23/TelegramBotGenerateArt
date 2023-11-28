require('dotenv').config()
const sequelize = require('./db')
const express = require('express')
const models = require('./models/models')
const TelegramBot = require('./router/indexBot')
const https = require('https')
const fs = require('fs')

// Подключаем middleware для обработки CORS-запросов и маршрутизатор
const cors = require('cors')
const router = require('./router/index')

const PORT = process.env.PORT || 5000 // Указываем порт, на котором будет работать приложение

const app = express() // Создаем экземпляр приложения Express
app.use(cors()) // Используем middleware для обработки CORS-запросов
app.use(express.json()) // Парсим JSON-данные при запросе
app.use('/api', router) // Используем маршрутизатор

app.post('/webhook', (req, res) => {
	const { pre_checkout_query } = req.body;

	if (pre_checkout_query) {
		const queryId = pre_checkout_query.id;

		// Обработка платежа и подтверждение
		// Ваш код для обработки платежа здесь

		// Ответить на PreCheckoutQuery
		bot.answerPreCheckoutQuery(queryId, true)
			.then(() => {
				console.log('Платеж подтвержден');
				res.sendStatus(200);
			})
			.catch((error) => {
				console.error('Ошибка при подтверждении платежа:', error);
				res.sendStatus(500);
			});
	} else {
		res.sendStatus(200);
	}
});


const start = async () => {
	try {
		await sequelize.authenticate() // Аутентификация в базе данных
		await sequelize.sync() // Синхронизация моделей с базой данных
		app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) // Запуск сервера на указанном порту
	} catch (e) {
		console.log(e) // Вывод ошибки при возникновении исключений
	}
}

start()


const { examples } = require('./models/models')
const cd = fs.readFileSync('./arts/examples/examples_12.png')

function pushDataBase() {
	const newExample = examples.create({
		type: 'photo',
		examplesImage: cd,
		examplesText: 'Girl, magicians robe, perfect anatomy, big breasts, short skirt, white eyes, white hair, white stockings, moon in the background, night.',
		Creator: 'Qugor',
		CreatorBool: true
	});
	console.log('Успешное сохранение в базу данных examples')
}

//  pushDataBase() 


