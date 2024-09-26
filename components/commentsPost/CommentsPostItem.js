import React from 'react';
import { Image, Text, View } from 'react-native';
import { formatDate } from '../../utils/formatDate';
import noPhoto from '../../assets/image/noPhoto.png';
import { color } from '../../style/color';

const CommentsPostItem = ({ item, ownerPost }) => {
  const { avatar, comment, holderComment, timestamp } = item;

  return (
    <View
      style={{
        flexDirection: holderComment === ownerPost ? 'row-reverse' : 'row',
        ...styleComments.flatItem,
      }}
    >
      <Image source={avatar ? { uri: avatar } : noPhoto} resizeMode="cover" style={{ ...styleComments.avatar }} />

      <View style={{ ...styleComments.commentBox }}>
        <Text style={{ ...styleComments.commentText }}>{comment}</Text>
        <Text
          style={{
            ...styleComments.commentDate,
            textAlign: holderComment === ownerPost ? '' : 'right',
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
