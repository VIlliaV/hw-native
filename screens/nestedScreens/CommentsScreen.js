import { KeyboardAvoidingView, Platform } from 'react-native';
import HeadContainer from '../../components/HeadContainer';
import CommentsSend from '../../components/commentsPost/CommentsSend';
import CommentsPostList from '../../components/commentsPost/CommentsPostList';

const CommentsScreen = () => {
  return (
    <HeadContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'padding'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : -140}
      >
        <CommentsPostList />
        <CommentsSend />
      </KeyboardAvoidingView>
    </HeadContainer>
  );
};

export default CommentsScreen;
