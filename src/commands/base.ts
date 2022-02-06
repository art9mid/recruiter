const BaseCommands = {
  start: /\/start/,
  voice: /\/voice/,
  exit: /\/exit/,
  cancelSell: /❌/,
};

export enum BaseFeatures {
  buy = 'buy',
  sell = 'sell',
  search = ' search',
  startBuy = 'startBuy',
  stopBuy = 'stopBuy',
  startSell = 'startSell',
  stopSell = 'stopSell',
}

export default BaseCommands;
