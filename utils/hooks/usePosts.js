import { useSelector } from 'react-redux';
import {
  selectPosts,
  selectPostsError,
  selectPostsOwners,
  selectIsLoadingPosts,
  selectIsLoadingPostsOwners,
  selectIsLoadingComments,
} from '../../redux/posts/postSelectors';

export const usePosts = () => {
  const posts = useSelector(selectPosts);
  const postsError = useSelector(selectPostsError);
  const postsOwners = useSelector(selectPostsOwners);
  const isLoadingPosts = useSelector(selectIsLoadingPosts);
  const isLoadingPostsOwners = useSelector(selectIsLoadingPostsOwners);
  const isLoadingComments = useSelector(selectIsLoadingComments);

  return {
    posts,
    postsError,
    postsOwners,
    isLoadingPosts,
    isLoadingPostsOwners,
    isLoadingComments,
  };
};
