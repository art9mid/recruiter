import { IBaseCommands, IMenuCommands, IBaseFeatures } from '../../types/commands';

const BaseCommands: IBaseCommands = {
  start: /\/start/,
  cancelSell: /❌/,
};

export const MenuCommands: IMenuCommands = {
  buy: /1🚀/,
  sell: /2/,
  search: /3/,
};

export const BaseFeatures: IBaseFeatures = {
  buy: 'buy',
  sell: 'sell',
  startBuy: 'startBuy',
  startSell: 'startSell',
};

export default BaseCommands;
