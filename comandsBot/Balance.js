const { User } = require('../models/models')

async function Balance(bot, chatId, UserId) {
	const user = await User.findOne({ where: { idTelegram: UserId } });
	bot.sendMessage(chatId, `Семпай, твой баланс: ${user.dataValues.Crystal}`)
}

module.exports = {
	Balance
}
