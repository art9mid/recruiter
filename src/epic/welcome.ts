import { Message } from 'node-telegram-bot-api';
import bot from '../create';
import { BaseFeatures } from '../commands/base';

async function welcome({ chat: { id } }: Message) {
  const options = {
    reply_markup: {
      inline_keyboard: [[
        { text: 'Купить аккаунт', callback_data: BaseFeatures.buy },
        { text: 'Продать аккаунт', callback_data: BaseFeatures.sell },
      ], [
        { text: 'Просмотреть предложения', callback_data: BaseFeatures.search },
      ]],
    },
  };

  await bot.sendMessage(id, '🆘 Бот для покупки/продажа аккаунтов в игре Brawl Stars!️ ‼️', options);
}

export default welcome;