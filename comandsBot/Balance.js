const fs = require('fs');
const { examples } = require('../models/models');

function Balance(bot, chatId) {
  const photoUrl = 'https://localhost:5000/examples/1'; // Замените на фактическую ссылку на фото

bot.sendPhoto(chatId, photoUrl);

}

module.exports = {
  Balance
}
