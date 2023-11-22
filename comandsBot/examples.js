const { examples } = require('../models/models');

async function Examples(bot, chatId) {
	const allItems = await examples.findAll();
	const randomIndex = Math.floor(Math.random() * allItems.length);
	const randomArt = allItems[randomIndex].id;

	const ex = await examples.findByPk(randomArt);
	bot.sendPhoto(chatId, ex.dataValues.examplesImage, { caption: ex.dataValues.examplesText });
}

	module.exports = {
		Examples,
	};
