const { examples } = require('../models/models');

async function Examples(bot, chatId) {
	const allItems = await examples.findAll();
	const randomIndex = Math.floor(Math.random() * allItems.length);
	const randomArt = allItems[randomIndex].id;

	const ex = await examples.findByPk(randomArt);

	const createrAvtop = ex.dataValues.CreatorBool ? ex.dataValues.Creator : 'Анонимный пользователь'
	const TEXT = `${ex.dataValues.examplesText}\n \nАвтор и владелец арта: ${createrAvtop}`

	bot.sendPhoto(chatId, ex.dataValues.examplesImage, { caption: TEXT });
}

	module.exports = {
		Examples,
	};
