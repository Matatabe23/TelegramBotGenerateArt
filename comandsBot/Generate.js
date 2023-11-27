const request = require('request');
const fs = require('fs');
const { UserSettings, User, UserImages } = require("../models/models")
const sequelize = require('sequelize');

const url = 'https://holara.ai/holara/api/external/1.0/generate_image';
const API_KEY = 'secret-6b7cfcc5-ad87-4d1e-a840-907374d9deaf'

async function Generate(bot, chatId, user, text) {
	const UserSett = await UserSettings.findOne({ where: { userId: user.dataValues.id } });
	if (text == '/generate') {
		bot.sendMessage(chatId, 'Напишите после /generate описания картинки. Пример /generate cat girl, black hair, red eyes...')
		return
	}
	if (user.dataValues.Crystal < UserSett.dataValues.Cost) {
		bot.sendMessage(chatId, 'Недостаточно кристаллов, пополните счет')
		return
	}
	await User.update(
		{ Crystal: sequelize.literal(`Crystal - ${UserSett.dataValues.Cost}`) },
		{ where: { idTelegram: user.dataValues.idTelegram } }
	);
	const data = {
		"api_key": API_KEY,
		"model": UserSett.model,
		"num_images": 1,
		"prompt": text.replace("/generate", ""),
		"negative_prompt": "",
		"width": UserSett.width,
		"height": UserSett.height,
		"steps": 28,
		"cfg_scale": 12,
	};


	request.post({ url, form: data }, async (error, response, body) => {
		if (error) {
			console.error('Error:', error);
		} else if (response.statusCode !== 200) {
			console.error(`Error: ${response.statusCode} ${body}`);
		} else {
			const responseData = JSON.parse(body);
			const imageBase64 = responseData.images[0];
			const image = Buffer.from(imageBase64, 'base64');
			await UserImages.create({
				image: image,
				Description: text.replace("/generate", ""),
				userId: user.dataValues.id,
			});
			bot.sendPhoto(chatId, image);
		}
	});
}

module.exports = {
	Generate,
};
