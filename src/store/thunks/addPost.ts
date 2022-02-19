import { User } from 'node-telegram-bot-api';
import store from '../index';
import { PostScheme } from '../../../types/post';
import { addPost } from '../../api/firebase/addPost';

export const addPostThunk = async (user: User, values: PostScheme) => {
  try {
    await addPost(user, values);
    store.addPostIsActive = false;
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};