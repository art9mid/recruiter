import { PostScheme } from '../../types/post';

export const resultText = (options: PostScheme) => {
  return `
☝️ Уровень: ${options?.lvl || '-'}\b
🏆 Трофеи: ${options?.trophies || '-'}\b
❤️ Бравлесы: ${options?.brawlers || '-'}\b
🐲 Легендарные: ${options?.legendary || '-'}\b
💎 Гемы: ${options?.gems || '-'}\b
⚜️ Золото: ${options?.gold || '-'}\n
<b>Цена продажи:</b> ${options?.price || '-'}`;
};
