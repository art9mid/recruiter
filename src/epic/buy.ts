import { CallbackQuery, Message } from 'node-telegram-bot-api';
import bot from '../create';
import { BaseFeatures } from '../commands/base';

interface Values {
  lvl?: string | null,
  trophies?: string | null,
  brawlers?: string | null,
  legendary?: string | null,
  gems?: string | null,
  gold?: string | null,
  price?: string | null
}

async function buy(message: CallbackQuery) {
  const chatId = message.message.chat.id;
  const values: Values = {};

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

  // @ts-ignore
  const setupMessage = await bot.sendMessage(chatId, text(), options);

  const editMessage = (key: keyof Values, value: string) => {
    bot.editMessageText(text({ ...values, [value]: value }), {
      parse_mode: 'HTML',
      chat_id: chatId,
      message_id: setupMessage.message_id,
    });
  };

  const setup = async () => {
    const sended1 = await bot.sendMessage(chatId, `Ваш уровень`);
    bot.once('message', async (message) => {
      values.lvl = message.text;
      await editMessage('lvl', message.text);
      await bot.deleteMessage(chatId, String(sended1.message_id));
      await bot.deleteMessage(chatId, String(message.message_id));
      const sended2 = await bot.sendMessage(chatId, `Ваши трофеи`);
      await bot.once('message', async (message) => {
        values.trophies = message.text;
        await editMessage('trophies', message.text);
        await bot.deleteMessage(chatId, String(sended2.message_id));
        await bot.deleteMessage(chatId, String(message.message_id));
        const sended3 = await bot.sendMessage(chatId, `Ваши бравлесы`);
        await bot.once('message', async (message) => {
          values.brawlers = message.text;
          await editMessage('brawlers', message.text);
          await bot.deleteMessage(chatId, String(sended3.message_id));
          await bot.deleteMessage(chatId, String(message.message_id));
          const sended4 = await bot.sendMessage(chatId, `Ваши легендарные`);
          await bot.once('message', async (message) => {
            values.legendary = message.text;
            await editMessage('legendary', message.text);
            await bot.deleteMessage(chatId, String(sended4.message_id));
            await bot.deleteMessage(chatId, String(message.message_id));
            const sended5 = await bot.sendMessage(chatId, `Ваши гемы`);
            await bot.once('message', async (message) => {
              values.gems = message.text;
              await editMessage('gems', message.text);
              await bot.deleteMessage(chatId, String(sended5.message_id));
              await bot.deleteMessage(chatId, String(message.message_id));
              const sended6 = await bot.sendMessage(chatId, `Ваше золото`);
              await bot.once('message', async (message) => {
                values.gold = message.text;
                await editMessage('gold', message.text);
                await bot.deleteMessage(chatId, String(sended6.message_id));
                await bot.deleteMessage(chatId, String(message.message_id));
                const sended7 = await bot.sendMessage(chatId, `За сколько хотите продать аккаунт ?`);
                await bot.once('message', async (message) => {
                  values.price = message.text;
                  await bot.deleteMessage(chatId, String(sended7.message_id));
                  await bot.deleteMessage(chatId, String(message.message_id));
                  await editMessage('price', message.text);
                  console.log(values);
                });
              });
            });
          });
        });
      });
    });
  };

  bot.once('callback_query', async (message: CallbackQuery) => {
    if (message.data === BaseFeatures.startSell) {
      await setup();
    }
  });
}

export default buy;