import { Message, SendMessageOptions } from 'node-telegram-bot-api';
import sell from './sell';
import bot from '../create';
import store from '../store';
import { MenuCommands } from '../commands/base';

export async function menu(chatId: number) {
  let replyOptions: SendMessageOptions = {
    reply_markup: {
      resize_keyboard: true,
      keyboard: [['1🚀', '2']],
    },
  };
  const text = `1. Купить аккаунт.\n2.Продать аккаунт.`;

  await bot.sendMessage(chatId, text, replyOptions);

  bot.onText(MenuCommands.buy, async (message: Message) => {
    if (!store.addPostIsActive) {
      await bot.sendMessage(message.chat.id, 'sell');
    }
  });
  bot.onText(MenuCommands.sell, async (message: Message) => {
    if (!store.addPostIsActive) {
      await sell(message);
    }
  });
}
