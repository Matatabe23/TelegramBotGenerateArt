const axios = require('axios');
const { UserSettings, User, UserImages } = require("../models/models");
const sequelize = require('sequelize');

const CRYSTAL_PRICE_100 = 10000;
const CRYSTAL_PRICE_200 = 20000;
const CRYSTAL_PRICE_400 = 40000;

async function pay(bot, chatId, text, user) {
	bot.removeListener('callback_query');
	bot.removeListener('successful_payment');
	bot.removeListener('pre_checkout_query');
	const paragraphs = [
		'Генерация 1 картинки будет стоить в зависимости от настроек которые ты задашь. Для изменения настроек картинки напиши /settings. Там же будет указанна цена в кристаллах после изменнеия настроек.',
		'Стоимость кристаллов:',
		'200 кристаллов = 100 рублей',
		'500 кристаллов = 200 рублей(Скидка 20%)',
		'1000 кристаллов = 400 рублей(Скидка 20%)',
	];
	await bot.sendMessage(chatId, paragraphs.join('\n\n'));
	const message1 = await bot.sendMessage(chatId, `Ты готов к покупке?`, Price);

	bot.on('callback_query', async msg => {
		const data = msg.data;
		if (data == CRYSTAL_PRICE_100 || data == CRYSTAL_PRICE_200 || data == CRYSTAL_PRICE_400) {
			bot.deleteMessage(chatId, message1.message_id)
			Oplata(bot, chatId, data);
		}
	});

	bot.on('successful_payment', async (msg) => {
		const selectedPrice = msg.successful_payment.total_amount;
		let additionalCrystals = 0;
		if (selectedPrice === 10000) {
			additionalCrystals = 200;
		} else if (selectedPrice === 20000) {
			additionalCrystals = 500;
		} else if (selectedPrice === 40000) {
			additionalCrystals = 1000;
		}
		console.log(additionalCrystals)
		await User.update(
			{ Crystal: sequelize.literal(`Crystal + ${additionalCrystals}`) },
			{ where: { idTelegram: user.dataValues.idTelegram } }
		);
		bot.sendMessage(chatId, 'Успешное пополнение!');
		bot.removeListener('successful_payment');
	});



	bot.on('pre_checkout_query', async (query) => {
		const chatId = query.from.id;
		const currency = query.currency;
		const totalAmount = query.total_amount;
		if (currency === 'RUB' && (totalAmount === 10000 || totalAmount === 20000 || totalAmount === 40000)) {
			try {
				// Отправить подтверждение платежа
				await bot.answerPreCheckoutQuery(query.id, true);
			} catch (error) {
				console.error('Ошибка при подтверждении платежа:', error);
			}
		} else {
			// Отправить отказ в подтверждении платежа
			console.log('aslkdm')
			try {
				const error = new Error('Некорректная валюта или сумма платежа');
				await bot.answerPreCheckoutQuery(query.id, false, error);
			} catch (err) {
				console.error('Ошибка при отказе в подтверждении платежа:', err);
			}
		}
	});
}

async function Oplata(bot, chatId, priceNumber) {
	try {
		await bot.sendInvoice(chatId,
			'Покупка кристаллов',
			'Оплата выбранного товара',
			'invoice',
			process.env.YOOKASSA_API_KEY,
			'RUB',
			[
				{
					label: 'RUB',
					amount: priceNumber
				}
			]);
	} catch (e) {
		console.log(e)
		bot.sendMessage(chatId, "Произошла ошибка")
	}
}

const Price = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[
				{ text: '100 кристаллов', callback_data: CRYSTAL_PRICE_100 },
				{ text: '500 кристаллов', callback_data: CRYSTAL_PRICE_200 },
				{ text: '1000 кристаллов', callback_data: CRYSTAL_PRICE_400 },
			],
		],
	}),
};

module.exports = {
	pay,
};
