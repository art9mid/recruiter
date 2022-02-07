import { fetchPostsThunk } from '../store/thunks/posts';
import { CallbackQuery, Message } from 'node-telegram-bot-api';
import bot from '../create';


async function posts(message: CallbackQuery | Message) {
  const chatId = 'chat' in message ? message?.chat?.id : message?.message?.chat?.id;

  fetchPostsThunk().then((response) => {
    if (response.success) {
      bot.sendMessage(chatId, `${response.data}`);
    }
  });
}

export default posts;