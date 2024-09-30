import SendSVG from '../../components/SVGComponents/SendSVG';
import { useRef, useState } from 'react';
import { color } from '../../style';
import { Keyboard, TextInput, TouchableOpacity, View } from 'react-native';
import { updatePostComments } from '../../redux/posts/postOperations';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../utils/hooks';

const CommentsSend = ({ idPost }) => {
  const [comment, setComment] = useState('');
  const [pending, setPending] = useState(false);

  const inputCommentsRef = useRef(null);
  const dispatch = useDispatch();
  const {
    user: { photoURL, uid },
  } = useAuth();

  const sendComment = async () => {
    const data = { avatar: photoURL, holderComment: uid, comment };
    setComment('');
    await dispatch(updatePostComments({ idPost, data })).unwrap();
    setPending(false);
  };

  const handleSend = () => {
    if (comment.trim() === '') return;

    setPending(true);
    if (inputCommentsRef.current) {
      const isFocused = inputCommentsRef.current.isFocused();
      !isFocused && sendComment();
    }
    Keyboard.dismiss();
  };

  return (
    <View style={{ ...styleCommentsSend.sendBox }}>
      <TextInput
        ref={inputCommentsRef}
        placeholder="Коментувати..."
        placeholderTextColor={color.placeholder}
        value={comment}
        onChangeText={value => setComment(value)}
        onBlur={() => {
          pending && sendComment();
        }}
        multiline={true}
        textAlignVertical="top"
        style={{ ...styleCommentsSend.sendInput }}
      />
      <TouchableOpacity style={{ ...styleCommentsSend.sendSVG }} activeOpacity={0.6} onPress={handleSend}>
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
