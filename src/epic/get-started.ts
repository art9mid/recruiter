import TelegramBot, { Message } from 'node-telegram-bot-api';
import BaseCommands from '../commands/base';

function getStarted(bot: TelegramBot) {
  bot.on('message', async (message: Message) => {
    const text = message.text;
    const chatId = message.chat.id;

    if (text === BaseCommands['/start']) {
      await bot.sendMessage(chatId, 'Добро пожаловать мазеФАКЕР');
    }
  });
}

export default getStarted;