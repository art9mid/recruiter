import TelegramBot, { Message } from 'node-telegram-bot-api';
import store from '../store';
import BaseCommands from '../commands/base';
import { options } from './welcome';

function getStarted(bot: TelegramBot) {
  const lang = store.getState().lang;
  bot.on('message', async (message: Message) => {
    const text = message.text;
    const chatId = message.chat.id;

    console.log(message);

    if (text === BaseCommands['start']) {
      await bot.sendMessage(chatId, `Добро пожаловать ${lang} \nВыберите язык`, options);
    }
  });
  bot.on('callback_query', (message) => {
    const action = message.data;

  });
}

export default getStarted;
