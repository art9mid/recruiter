import { db } from './index';
import { User } from 'node-telegram-bot-api';

export function addPost(user: User, data: any) {
  return db.collection(`posts`).add({ data, user });
}