const BaseCommands = {
  start: /\/start/,
  cancelSell: /❌/,
};

export const MenuCommands = {
  buy: /1🚀/,
  sell: /2/,
  search: /3/,
};

export enum BaseFeatures {
  buy = 'buy',
  sell = 'sell',
  startBuy = 'startBuy',
  startSell = 'startSell',
}

export default BaseCommands;
