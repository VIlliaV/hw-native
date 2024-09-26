import { KeyboardAvoidingView, Platform } from 'react-native';
import HeadContainer from '../../components/HeadContainer';
import CommentsSend from '../../components/commentsPost/CommentsSend';
import CommentsPostList from '../../components/commentsPost/CommentsPostList';
import { useRoute } from '@react-navigation/native';

const CommentsScreen = () => {
  const {
    params: { idPost, comments, postImage, ownerPost },
  } = useRoute();

  return (
    <HeadContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'padding'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : -140}
      >
        <CommentsPostList idPost={idPost} comments={comments} postImage={postImage} ownerPost={ownerPost} />
        <CommentsSend idPost={idPost} />
      </KeyboardAvoidingView>
    </HeadContainer>
  );
};

export default CommentsScreen;
