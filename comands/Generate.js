const axios = require('axios');
const fs = require('fs');

function Generate(bot, chatId, text) {
	data = {
		'api_key': process.env.API_KEY,
		'model': 'Akasha: Anime',
		'prompt': text,
		'negative_prompt': '',
		'width': 512,
		'height': 512,
		'steps': 28,
		'cfg_scale': 12
	}

	axios.post(process.env.url, data)
		.then((response) => {
			if (response.status !== 200) {
				console.log(`Error: ${response.status} ${response.data}`);
			} else {
				const responseData = response.data;
				console.log(`Status: ${responseData.status}`);
				console.log(`Execution Time: ${Math.round(responseData.execution_time * 100) / 100}s`);
				console.log(`Generation Cost: ${responseData.generation_cost}`);
				console.log(`Hologems Remaining: ${responseData.hologems_remaining}`);

				const imageBase64 = responseData.images[0];
				const image = Buffer.from(imageBase64, 'base64');
				fs.writeFileSync('image.png', image);
			}
		})
		.catch((error) => {
			console.error('Error:', error.message);
		});
}

module.exports = {
	Generate
}