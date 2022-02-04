import { CallbackQuery, Message } from 'node-telegram-bot-api';
import bot from '../create';
import buy from './buy';
import welcome from './welcome';
import BaseCommands, { BaseFeatures } from '../commands/base';

function getStarted() {
  bot.onText(BaseCommands.start, welcome);
  bot.on('callback_query', async (message: CallbackQuery) => {
    const action = message.data;
    const chatId = message.message.chat.id;

    if (action === BaseFeatures.buy) {
      buy(message);
    } else if (action === BaseFeatures.sell) {
      await bot.sendMessage(chatId, 'sell');
    } else if (action === BaseFeatures.search) {
      await bot.sendMessage(chatId, 'search');
    }
  });
}

export default getStarted;
