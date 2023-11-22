const { examples } = require('../models/models')

async function Balance(bot, chatId) {
	try {
		const photo = await examples.findOne({});
		const NewPhoto = photo.dataValues.examplesImage
		console.log(NewPhoto)

		if (NewPhoto) {
			bot.sendPhoto(chatId, NewPhoto);
		} else {
			
		}
	} catch (error) {
		console.error('Ошибка при выполнении запроса к базе данных:', error);
		// ...
	}
}

module.exports = {
	Balance
}
