import { KeyboardAvoidingView, Platform } from 'react-native';
import HeadContainer from '../../components/HeadContainer';
import CommentsSend from '../../components/commentsPost/CommentsSend';
import CommentsPostList from '../../components/commentsPost/CommentsPostList';
import { useRoute } from '@react-navigation/native';
import { useDocSubscription } from '../../utils/hooks/useDocSubscription';
import { usePosts } from '../../utils/hooks/usePosts';

const CommentsScreen = () => {
  const {
    params: { idPost, fromRoute },
  } = useRoute();

  let postData = {};

  const { posts, postsOwners } = usePosts();

  if (fromRoute === 'ProfileScreen') {
    postData = postsOwners.find(item => item.id === idPost);
  } else {
    postData = posts.find(item => item.id === idPost);
  }

  const { comments = [], urlPhoto, owner } = postData;
  useDocSubscription('posts', idPost);

  return (
    <HeadContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'padding'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : -140}
      >
        <CommentsPostList comments={comments} postImage={urlPhoto} ownerPost={owner} />
        <CommentsSend idPost={idPost} />
      </KeyboardAvoidingView>
    </HeadContainer>
  );
};

export default CommentsScreen;
