import { CallbackQuery, Message } from 'node-telegram-bot-api';
import bot from '../create';
import { resultText } from '../data/texts';
import { fetchPostsThunk } from '../store/thunks/posts';


async function posts(message: CallbackQuery | Message) {
  const chatId = 'chat' in message ? message?.chat?.id : message?.message?.chat?.id;

  fetchPostsThunk().then((response) => {
    if (response.success) {
      bot.sendMessage(chatId, `${resultText(response.data.data)}`, { parse_mode: 'HTML' });
    }
  });
}

export default posts;