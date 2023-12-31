function usagePolicy(bot, chatId) {
  const paragraphs = [
    '1. Используя данного бота, вы соглашаетесь с правилами перечисленными ниже.',
    '2. Незнание правил не освобождает от ответственности.',
		'3. После генерации изображения, права на изображение переходят к пользователю, создавшему запрос.',
		'4. Купленные кристаллы не подлежат возврату.',
		'5. Бот не всегда может выдавать желаемый результат, это стоит учитывать.',
		'6. Создатель бота не несет ответственности за полученный пользователем контент после генерации изображения.',
		'7. При использовании бота запрещаеться делать запросы на контент, запрещенный законодательством РФ или страны проживания пользователя.',
		'8. Бот может генерировать NSFW контент, но он не должен выходить за рамки законодательства РФ или страны проживания пользователя.',
		'9. Используя данного бота вы подтвержаете, что вам есть +18 лет',
  ];
  const message = paragraphs.join('\n\n');
  bot.sendMessage(chatId, message);
}

module.exports = {
  usagePolicy
};
