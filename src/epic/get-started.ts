import TelegramBot, { Message } from 'node-telegram-bot-api';
import BaseCommands from '../commands/base';
import store from '../store';

function getStarted(bot: TelegramBot) {
  const lang = store.getState().lang;
  bot.on('message', async (message: Message) => {
    const text = message.text;
    const chatId = message.chat.id;

    if (text === BaseCommands['/start']) {
      await bot.sendMessage(chatId, `Добро пожаловать ${lang}`);
    }
  });
}

export default getStarted;