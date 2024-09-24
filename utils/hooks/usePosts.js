import { useSelector } from 'react-redux';
import { selectPosts, selectPostsError, selectPostsOwners } from '../../redux/posts/postSelectors';

export const usePosts = () => {
  const posts = useSelector(selectPosts);
  const postsError = useSelector(selectPostsError);
  const postsOwners = useSelector(selectPostsOwners);

  return {
    posts,
    postsError,
    postsOwners,
  };
};
