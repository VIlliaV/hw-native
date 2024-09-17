import { useSelector } from 'react-redux';
import { selectPosts, selectPostsError } from '../../redux/posts/postSelectors';

export const usePosts = () => {
  const posts = useSelector(selectPosts);
  const postsError = useSelector(selectPostsError);

  return {
    posts,
    postsError,
  };
};
