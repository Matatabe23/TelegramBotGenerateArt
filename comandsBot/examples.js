function examples(bot, chatId) {
  const data = [
    {
      type: 'photo',
      media: './arts/examples/examples_1.png',
      caption:
        'Woman, white shirt, black pencil skirt, tights, big breasts, perfect anatomy, sitting in a chair, black hair, red eyes, cute face, insidious smile, looking down at the viewer, long hair.',
    },
    {
      type: 'photo',
      media: './arts/examples/examples_2.png',
      caption:
        'Girl, pink hair, blue eyes, perfect anatomy, long hair, pink bikini, slim body, small breasts, cute face, smile on her face, beach, holding a ball.',
    },
		{
      type: 'photo',
      media: './arts/examples/examples_3.png',
      caption:
        'girl, perfect anatomy, medium breasts, yellow hair, red hair tips, orange eyes, paired katanas, bright smile, fiery cloak, night sky with moon, black dress with short skirt, full-length view, looks at the viewer, holds a katana over his head.',
    },
  ];

  bot.sendChatAction(chatId, 'typing');
  const randomIndex = Math.floor(Math.random() * data.length);
  const randomItem = data[randomIndex];
  bot.sendPhoto(chatId, randomItem.media, { caption: randomItem.caption });
}

module.exports = {
  examples,
};
