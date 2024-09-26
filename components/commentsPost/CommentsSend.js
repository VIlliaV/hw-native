import SendSVG from '../../components/SVGComponents/SendSVG';
import { useState } from 'react';
import { color } from '../../style/color';
import { Keyboard, TextInput, TouchableOpacity, View } from 'react-native';
import { updatePostComments } from '../../redux/posts/postOperations';
import { useAuth } from '../../utils/hooks/useAuth';
import { useDispatch } from 'react-redux';

const CommentsSend = ({ idPost }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const {
    user: { photoURL, uid },
  } = useAuth();

  const sendComment = async () => {
    const data = { avatar: photoURL, holderComment: uid, comment };
    await dispatch(updatePostComments({ idPost, data })).unwrap();
    setComment('');
    Keyboard.dismiss();
  };
  return (
    <View style={{ ...styleCommentsSend.sendBox }}>
      <TextInput
        placeholder="Коментувати..."
        placeholderTextColor={color.placeholder}
        value={comment}
        onChangeText={value => setComment(value)}
        multiline={true}
        textAlignVertical="top"
        // onSubmitEditing={sendComment}
        style={{ ...styleCommentsSend.sendInput }}
      />
      <TouchableOpacity style={{ ...styleCommentsSend.sendSVG }} activeOpacity={0.6} onPress={sendComment}>
        <SendSVG />
      </TouchableOpacity>
    </View>
  );
};

export default CommentsSend;

const styleCommentsSend = {
  sendBox: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: color.bg,
    paddingBottom: 34,
    zIndex: 100,
    overflow: 'hidden',
  },

  sendInput: {
    width: '100%',
    maxHeight: 100,
    padding: 16,
    paddingRight: 50,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: color.primary,
    borderColor: color.placeholder,
    borderWidth: 1,
    lineHeight: 19,
    borderRadius: 50,
    overflow: 'hidden',
  },

  sendSVG: {
    position: 'absolute',
    right: 8,
    top: '50%',
    transform: [{ translateY: -17 }],
  },
};
