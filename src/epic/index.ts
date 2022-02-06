import { CallbackQuery, Message } from 'node-telegram-bot-api';
import bot from '../create';
import sell from './sell';
import welcome from './welcome';
import BaseCommands, { BaseFeatures } from '../commands/base';

function getStarted() {
  bot.onText(BaseCommands.start, welcome);
  bot.on('callback_query', async (message: CallbackQuery) => {
    const action = message.data;
    const chatId = message.message.chat.id;
    await bot.sendMessage(chatId, 'sell');
    if (action === BaseFeatures.buy) {
    } else if (action === BaseFeatures.sell) {
      sell(message);
    } else if (action === BaseFeatures.search) {
      await bot.sendMessage(chatId, 'search');
    }
  });
}

export default getStarted;
