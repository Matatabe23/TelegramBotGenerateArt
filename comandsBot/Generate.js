const { promisify } = require('util');
const { exec } = require('child_process');
const { UserSettings } = require('../models/models')

// Преобразование функции exec в промис
const execPromise = promisify(exec);

async function Generate(bot, chatId, user, text) {
  const UserSett = await UserSettings.findOne({ where: { userId: user.dataValues.id } });
  const data = {
    'api_key': process.env.API_KEY,
    'model': UserSett.model,
    'num_images': 1,
    'prompt': text.replace('/generate', ''),
    'negative_prompt': '',
    'width': UserSett.width,
    'height': UserSett.height,
    'steps': 28,
    'cfg_scale': 12,
  };
  const pythonScript = `python comandsBot/generate.py ${JSON.stringify(data)}`;

  try {
    // Вызов скрипта Python и ожидание результата
    const { stdout } = await execPromise(pythonScript);
    console.log(`Результат выполнения скрипта Python:\n${stdout}`);
    return stdout;
  } catch (error) {
    console.error(`Ошибка выполнения скрипта Python: ${error}`);
    throw error;
  }
}

module.exports = {
  Generate,
};
