import { CallbackQuery, Message, SendMessageOptions } from 'node-telegram-bot-api';
import bot from '../create';
import store from '../store';
import { menu } from './menu';
import { resultText } from '../data/texts';
import { PostScheme } from '../../types/post';
import { addPostThunk } from '../store/thunks/addPost';
import BaseCommands, { BaseFeatures } from '../commands/base';

async function sell(message: CallbackQuery | Message) {
  const chatId = 'chat' in message ? message?.chat?.id : message?.message?.chat?.id;
  let values: PostScheme = {};

  const options: SendMessageOptions = {
    parse_mode: 'HTML',
    reply_markup: {
      force_reply: true,
      inline_keyboard: [[{ text: 'Начать', callback_data: BaseFeatures.startSell }]],
    },
  };

  const getText = (options: PostScheme): string => {
    return `🆘 <b>Для начала продажи аккаунта заполните необходимые поля ‼️</b>\n${resultText(options)}`;
  };

  const setupMessage = await bot.sendMessage(chatId, getText(values), options);

  const editMessage = async (key?: keyof PostScheme, value?: string) => {
    await bot.editMessageText(value ? getText({ ...values, [value]: value }) : setupMessage.text, {
      parse_mode: 'HTML',
      chat_id: chatId,
      message_id: setupMessage.message_id,
    });
  };

  let replyOptions: SendMessageOptions = {
    reply_markup: {
      resize_keyboard: true,
      keyboard: [['❌']],
    },
  };

  const startForm = async (message: CallbackQuery) => {
    store.addPostIsActive = true;
    if (message.data === BaseFeatures.startSell) {
      await editMessage();
      await setup();
    }
  };

  const stopForm = async () => {
    values = {};
    store.addPostIsActive = false;
    await bot.removeTextListener(BaseCommands.cancelSell);

    await bot.sendMessage(chatId, `Действие отменино`, { reply_markup: { hide_keyboard: true } });
    await menu(chatId);
  };

  bot.onText(BaseCommands.cancelSell, stopForm);
  bot.once('callback_query', startForm);

  const addPostHandler = async (message: Message) => {
    await addPostThunk(message.from, values)
      .then(async ({ success }) => {
        if (success) {
          await bot.sendMessage(chatId, `Отлично, вы создали обьявление, оно выглядит вот так:\n${resultText(values)}`, {
            parse_mode: 'HTML',
            reply_markup: { hide_keyboard: true },
          });
        } else {
          await bot.sendMessage(chatId, `При создании обьявление произошла ошибка, попробуйте позже`, {
            parse_mode: 'HTML',
            reply_markup: { hide_keyboard: true },
          });
        }
      });
  };

  const setup = async () => {
    await bot.sendMessage(chatId, `Ваш уровень`, replyOptions);
    store.addPostIsActive && bot.once('message', async (message) => {
      values.lvl = message.text;
      store.addPostIsActive && await editMessage('lvl', message.text);
      store.addPostIsActive && await bot.sendMessage(chatId, `Ваши трофеи`);
      store.addPostIsActive && await bot.once('message', async (message) => {
        values.trophies = message.text;
        store.addPostIsActive && await editMessage('trophies', message.text);
        store.addPostIsActive && await bot.sendMessage(chatId, `Ваши бравлесы`);
        store.addPostIsActive && await bot.once('message', async (message) => {
          values.brawlers = message.text;
          store.addPostIsActive && await editMessage('brawlers', message.text);
          store.addPostIsActive && await bot.sendMessage(chatId, `Ваши легендарные`);
          store.addPostIsActive && await bot.once('message', async (message) => {
            values.legendary = message.text;
            store.addPostIsActive && await editMessage('legendary', message.text);
            store.addPostIsActive && await bot.sendMessage(chatId, `Ваши гемы`);
            store.addPostIsActive && await bot.once('message', async (message) => {
              values.gems = message.text;
              store.addPostIsActive && await editMessage('gems', message.text);
              store.addPostIsActive && await bot.sendMessage(chatId, `Ваше золото`);
              store.addPostIsActive && await bot.once('message', async (message) => {
                values.gold = message.text;
                store.addPostIsActive && await editMessage('gold', message.text);
                store.addPostIsActive && await bot.sendMessage(chatId, `За сколько хотите продать аккаунт ?`);
                store.addPostIsActive && await bot.once('message', async (message) => {
                  values.price = message.text;
                  store.addPostIsActive && await editMessage('price', message.text);
                  store.addPostIsActive && await addPostHandler(message);
                  await menu(chatId);
                });
              });
            });
          });
        });
      });
    });
  };
}

export default sell;