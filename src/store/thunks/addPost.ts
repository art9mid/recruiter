import { User } from 'node-telegram-bot-api';
import { addPost } from '../../api/firebase/addPost';
import { PostScheme } from '../../scheme/post';
import store from '../index';

export const addPostThunk = async (user: User, values: PostScheme) => {
  try {
    await addPost(user, values);
    store.addPostIsActive = false;
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};