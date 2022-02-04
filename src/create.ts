import TelegramBot, { ConstructorOptions } from 'node-telegram-bot-api';

const token = process.env.BOT_TOKEN;

function useBot(params?: ConstructorOptions): TelegramBot {
  return new TelegramBot(token, { ...params, polling: true });
}

const bot = useBot();

export default bot;