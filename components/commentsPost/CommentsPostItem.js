import React from 'react';
import { Image, Text, View } from 'react-native';
import { formatDate } from '../../utils/formatDate';

import avatar from '../../assets/image/avatarImage.jpg';
import { color } from '../../style/color';

const CommentsPostItem = ({ item }) => {
  return (
    <View
      style={{
        flexDirection: item.holderComment === 'email@example.com' ? 'row-reverse' : 'row',
        ...styleComments.flatItem,
      }}
    >
      <Image source={avatar} resizeMode="cover" style={{ ...styleComments.avatar }} />

      <View style={{ ...styleComments.commentBox }}>
        <Text style={{ ...styleComments.commentText }}>{item.comment}</Text>
        <Text
          style={{
            ...styleComments.commentDate,
            textAlign: item.holderComment === 'email@example.com' ? '' : 'right',
          }}
        >
          {formatDate(item.dateComment)}
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
