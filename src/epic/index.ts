import { CallbackQuery } from 'node-telegram-bot-api';
import bot from '../create';
import sell from './sell';
import welcome from './welcome';
import BaseCommands, { BaseFeatures } from '../commands/base';
import posts from './posts';

function getStarted() {
  bot.onText(BaseCommands.start, welcome);

  bot.on('callback_query', async (message: CallbackQuery) => {
    const action = message.data;
    const chatId = message.message.chat.id;
    if (action === BaseFeatures.buy) {
      await posts(message);
    } else if (action === BaseFeatures.sell) {
      await sell(message);
    }
  });
}

export default getStarted;