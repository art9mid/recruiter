import { CallbackQuery } from 'node-telegram-bot-api';
import bot from '../create';
import welcome from './welcome';
import BaseCommands, { BaseFeatures } from '../commands/base';

interface Values {
  lvl?: string | null,
  trophies?: string | null,
  brawlers?: string | null,
  legendary?: string | null,
  gems?: string | null,
  gold?: string | null,
  price?: string | null
}

async function sell(message: CallbackQuery) {
  const chatId = message.message.chat.id;
  let values: Values = {};

  let isActive: boolean = false;

  const options = {
    parse_mode: 'HTML',
    reply_markup: {
      force_reply: true,
      inline_keyboard: [[
        { text: 'Начать', callback_data: BaseFeatures.startSell },
        { text: 'Отменить', callback_data: BaseFeatures.stopSell },
      ]],
    },
  };

  const text = (options: Values) => {
    return `
🆘 <b>Для начала продажи аккаунта заполните необходимые поля ‼️</b>\n
☝️ Уровень: ${options?.lvl || '-'}\b
🏆 Трофеи: ${options?.trophies || '-'}\b
❤️ Бравлесы: ${options?.brawlers || '-'}\b
🐲 Легендарные: ${options?.legendary || '-'}\b
💎 Гемы: ${options?.gems || '-'}\b
⚜️ Золото: ${options?.gold || '-'}\n
<b>Цена продажи:</b> ${options?.price || '-'}`;
  };

  const resultText = (options: Values) => {
    return `
☝️ Уровень: ${options?.lvl || '-'}\b
🏆 Трофеи: ${options?.trophies || '-'}\b
❤️ Бравлесы: ${options?.brawlers || '-'}\b
🐲 Легендарные: ${options?.legendary || '-'}\b
💎 Гемы: ${options?.gems || '-'}\b
⚜️ Золото: ${options?.gold || '-'}\n
<b>Цена продажи:</b> ${options?.price || '-'}`;
  };

  // @ts-ignore
  const setupMessage = await bot.sendMessage(chatId, text(), options);

  const editMessage = (key?: keyof Values, value?: string) => {
    bot.editMessageText(value ? text({ ...values, [value]: value }) : setupMessage.text, {
      parse_mode: 'HTML',
      chat_id: chatId,
      message_id: setupMessage.message_id,
    });
  };

  let replyOptions = {
    reply_markup: {
      resize_keyboard: true,
      keyboard: [['❌']],
    },
  };

  const startForm = async (message: CallbackQuery) => {
    isActive = true;
    if (message.data === BaseFeatures.startSell) {
      await editMessage();
      await setup();
    }
  };

  const stopForm = async () => {
    values = {};
    isActive = false;
    await bot.removeTextListener(BaseCommands.cancelSell);
    await bot.sendMessage(chatId, `Действие отменино`, {
      reply_markup: { hide_keyboard: true },
    });
    await welcome(message);
  };

  bot.onText(BaseCommands.cancelSell, stopForm);
  bot.once('callback_query', startForm);

  const setup = async () => {
    await bot.sendMessage(chatId, `Ваш уровень`, replyOptions);
    if (isActive) {
      bot.once('message', async (message) => {
        values.lvl = message.text;
        isActive && await editMessage('lvl', message.text);
        isActive && await bot.sendMessage(chatId, `Ваши трофеи`);
        isActive && await bot.once('message', async (message) => {
          values.trophies = message.text;
          isActive && await editMessage('trophies', message.text);
          isActive && await bot.sendMessage(chatId, `Ваши бравлесы`);
          isActive && await bot.once('message', async (message) => {
            values.brawlers = message.text;
            isActive && await editMessage('brawlers', message.text);
            isActive && await bot.sendMessage(chatId, `Ваши легендарные`);
            isActive && await bot.once('message', async (message) => {
              values.legendary = message.text;
              isActive && await editMessage('legendary', message.text);
              isActive && await bot.sendMessage(chatId, `Ваши гемы`);
              isActive && await bot.once('message', async (message) => {
                values.gems = message.text;
                isActive && await editMessage('gems', message.text);
                isActive && await bot.sendMessage(chatId, `Ваше золото`);
                isActive && await bot.once('message', async (message) => {
                  values.gold = message.text;
                  isActive && await editMessage('gold', message.text);
                  isActive && await bot.sendMessage(chatId, `За сколько хотите продать аккаунт ?`);
                  isActive && await bot.once('message', async (message) => {
                    values.price = message.text;
                    isActive && await editMessage('price', message.text);
                    isActive && await bot.sendMessage(chatId, `Отлично, вы создали обьявление, оно выглядит вот так:\n${resultText(values)}`, {
                      parse_mode: 'HTML',
                      reply_markup: {
                        hide_keyboard: true,
                      },
                    });
                  });
                });
              });
            });
          });
        });
      });
    }
  };
}

export default sell;