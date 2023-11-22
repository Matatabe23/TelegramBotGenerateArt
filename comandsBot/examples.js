const { examples } = require('../models/models');

let shownArts = [];

async function Examples(bot, chatId) {
	const allItems = await examples.findAll();
	const availableArts = allItems.filter((item) => !shownArts.includes(item.id));
	if (availableArts.length === 1) {
		shownArts = [];
	}
	const randomIndex = Math.floor(Math.random() * availableArts.length);
	const randomArt = availableArts[randomIndex].id;
	const ex = await examples.findByPk(randomArt);
	const createrAvtop = ex.dataValues.CreatorBool ? ex.dataValues.Creator : 'Анонимный пользователь';
	const TEXT = `${ex.dataValues.examplesText}\n \nАвтор и владелец арта: ${createrAvtop}`;
	shownArts.push(randomArt);

	bot.sendPhoto(chatId, ex.dataValues.examplesImage, { caption: TEXT });
}

module.exports = {
	Examples,
};
