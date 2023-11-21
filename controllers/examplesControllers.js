const { ApiError } = require('../error/ApiError') // Импортируем класс ApiError для обработки ошибок запросов
const { examples } = require('../models/models') // Импортируем модель User из базы данных
const sequelize = require('../db')


class examplesController {
	async CreateRecord(req, res, next) {
		const { type, examplesImage, examplesText } = req.body 

    const newExample = examples.create({
			type: type,
      examplesImage: examplesImage,
			examplesText: examplesText
    });

		return res.json({ newExample }) 
	}
}

module.exports = new examplesController()