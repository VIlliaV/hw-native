import { Text, View } from 'react-native';
import { formatDate } from '../../utils/formatDate';
import { color } from '../../style';
import CustomImage from '../CustomImage';

const CommentsPostItem = ({ item, ownerPost }) => {
  const { avatar, comment, holderComment, timestamp } = item;
  const isOwnerComment = holderComment === ownerPost;

  return (
    <View
      style={{
        flexDirection: isOwnerComment ? 'row-reverse' : 'row',
        ...styleComments.flatItem,
      }}
    >
      <CustomImage source={avatar} resizeMode="cover" style={{ ...styleComments.avatar }} />

      <View style={{ ...styleComments.commentBox }}>
        <Text style={{ ...styleComments.commentText }}>{comment}</Text>
        <Text
          style={{
            ...styleComments.commentDate,
            textAlign: isOwnerComment ? '' : 'right',
          }}
        >
          {formatDate(timestamp)}
        </Text>
      </View>
    </View>
  );
};

export default CommentsPostItem;

const styleComments = {
  flatItem: {
    gap: 16,
    display: 'flex',
    marginBottom: 24,
  },

  avatar: { borderRadius: 28, width: 28, height: 28 },
  commentBox: {
    flex: 1,
    padding: 16,
    backgroundColor: ' rgba(0, 0, 0, 0.03)',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  commentText: {
    color: color.primary,
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  commentDate: {
    color: color.placeholder,
    fontFamily: 'Roboto-Regular',
    fontSize: 10,
  },
};
