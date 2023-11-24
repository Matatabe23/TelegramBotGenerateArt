const axios = require('axios');
const { UserSettings } = require('../models/models');

const API_KEY = 'secret-6b7cfcc5-ad87-4d1e-a840-907374d9deaf';
const url = 'https://holara.ai/holara/api/external/1.0/generate_image';

async function Generate(bot, chatId, user, text) {
	const UserSett = await UserSettings.findOne({ where: { userId: user.dataValues.id } });

	 data = {
		api_key: 'secret-6b7cfcc5-ad87-4d1e-a840-907374d9deaf',
		model: UserSett.dataValues.model,
		prompt: '1girl, solo, black hair, red eyes, snowing, long hair, fox ears',
		negative_prompt: '',
		width: UserSett.dataValues.width,
		height: UserSett.dataValues.height,
		steps: 28,
		cfg_scale: 12,
	};


	const newData = JSON.stringify(data).replace(/"/g, "'").replace(/:/g, ': ').replace(/,/g, ', ');
	console.log(newData)

	try {
		const response = await axios.post(url, newData);
		console.log(response.data)
		if (response.status !== 200) {
			console.log(`Error: ${response.status} ${response.data}`);
		} else {
			const imageData = response.data.images[0];
			const imageBuffer = Buffer.from(imageData, 'base64');
			// Handle the image buffer as needed
		}
	} catch (error) {
		console.log('Error:', error.message);
	}
}

module.exports = {
	Generate,
};
