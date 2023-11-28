const { StartPrimer } = require('../models/models');

async function Start(bot, chatId, name, UserId, sistemName) {
  const allItems = await StartPrimer.findAll();
  await bot.sendChatAction(chatId, 'typing');
  await bot.sendMessage(chatId, `Привет, ${name}! Я очень рада тебя видеть!`);
  await bot.sendMessage(chatId, `Я умею генерировать любые аниме картинки. Описывай персонажа четко для получения нужного тебе результата. Лучше всего описание делать на английском языке.\n \nИспользуй /help что бы получить больше информации. \n \nПеред использованием ознакомся с политикой использования /usagepolicy и политикой конфиденциальности /privacypolicy \n \nВот тебе пример:`);
  
  for (const item of allItems) {
    await bot.sendPhoto(chatId, item.dataValues.image, { caption: item.dataValues.Description });
  }
}

module.exports = {
  Start
};
