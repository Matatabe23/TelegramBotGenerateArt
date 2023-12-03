const { ApiError } = require('../error/ApiError') // Импортируем класс ApiError для обработки ошибок запросов
const { UserImages } = require('../models/models') // Импортируем модель User из базы данных


class adminPanelController {
	async GetListPhotos(req, res, next) {
		try {
			// const posts = await UserImages.findAll();
			// res.send(posts);
		} catch (error) {
			console.error(error);
			res.status(500).send('Server Error');
		}
	}
}

module.exports = new adminPanelController()