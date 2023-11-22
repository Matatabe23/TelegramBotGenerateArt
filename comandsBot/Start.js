const { User } = require('../models/models')

async function Start(bot, chatId, name, UserId, sistemName) {
	const data = [
		{ type: 'photo', media: './arts/StartExamples/primer1.png', caption: 'Woman, big breasts, perfect anatomy, snow-white hair, angel wings, snow-white skin, among the clouds, a dress with a short skirt, bare legs, elf ears, a cute face, a two-handed staff of gold covered with lightning.' },
		{ type: 'photo', media: './arts/StartExamples/primer2.png', caption: 'Woman, black hair, devil horns, big horns, perfect anatomy, red eyes, bright burgundy lips, fangs, white shirt, red short skirt, stockings, cute face, big breasts.' },
	];

	const user = await User.findOne({ where: { idTelegram: UserId } });
	if (!user) {
		const user = await User.create({
			idTelegram: UserId,
			name: name,
			sistemName: sistemName
		})
	}



	bot.sendChatAction(chatId, 'typing');
	bot.sendMessage(chatId, `Привет, ${name}! Я очень рада тебя видеть!`);
	setTimeout(() => {
		bot.sendMessage(chatId, `Я умею генерировать любые аниме картинки. Описывай персонажа четко для получения нужного тебе результата. Лучше всего описание делать на английском языке.\n \nИспользуй /help что бы получить больше информации. \n \nПеред использованием ознакомся с политикой использования /usagepolicy \n \nВот тебе пример:`);
	}, 1000);
	setTimeout(() => {
		bot.sendMediaGroup(chatId, data);
		data.forEach((item, index) => {
			const id = index + 1;
			const formattedCaption = `${id}. ${item.caption}`;
			bot.sendMessage(chatId, formattedCaption);
		});
	}, 2000);
}

module.exports = {
	Start
};
