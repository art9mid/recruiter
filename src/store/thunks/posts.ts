import { fetchPosts } from '../../api/firebase/posts';

export const fetchPostsThunk = async () => {
  try {
    const data = await fetchPosts();
    return { success: true, data };
  } catch (error) {
    return { success: false };
  }
};