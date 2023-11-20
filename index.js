require('dotenv').config()
const sequelize = require('./db')
const express = require('express')
const models = require('./models/models')
const TelegramBot = require('./router/indexBot')

// Подключаем middleware для обработки CORS-запросов и маршрутизатор
const cors = require('cors')
const router = require('./router/index')

const PORT = process.env.PORT || 5000 // Указываем порт, на котором будет работать приложение

const app = express() // Создаем экземпляр приложения Express
app.use(cors()) // Используем middleware для обработки CORS-запросов
app.use(express.json()) // Парсим JSON-данные при запросе
app.use('/api', router) // Используем маршрутизатор


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


const fs = require('fs');
const { examples } = require('./models/models');

class adssa {
  async balanc() {
    // Получите последний идентификатор из базы данных
    const lastId = await examples.max('id');
    console.log(lastId);

    // Прочитайте фотографию из файла
    const photoData = fs.readFileSync('./arts/examples/examples_1.png'); // Замените 'путь/к/фото.jpg' на фактический путь к файлу фотографии

    // Создайте новый экземпляр модели examples с увеличенным URL
    const newExample = examples.create({
      examplesImage: photoData,
      Image_url: `https://localhost:5000/examples/${lastId + 1}`
    });

    // Отправьте фото с помощью бота
    // bot.sendPhoto(chatId, newExample.Image_url);
  }
}

const instance = new adssa();
// instance.balanc();


