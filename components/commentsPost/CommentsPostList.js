import { FlatList, Image, View, Text } from 'react-native';
import { styles } from '../../style/styles';
import CommentsPostItem from './CommentsPostItem';
import noPhoto from '../../assets/image/noPhoto.png';
import { useEffect, useRef } from 'react';

const CommentsPostList = ({ comments, postImage, ownerPost }) => {
  const flatListCommentsRef = useRef(null);

  useEffect(() => {
    if (flatListCommentsRef.current) {
      flatListCommentsRef.current.scrollToOffset({ offset: comments.length * 1000, animated: true });
    }
  }, [comments]);

  return (
    <FlatList
      ref={flatListCommentsRef}
      data={comments}
      style={{ minHeight: '100%' }}
      ListFooterComponent={<View style={{ height: 50, marginBottom: 34 }}></View>}
      ListHeaderComponent={
        <Image
          source={postImage ? { uri: postImage } : noPhoto}
          resizeMode="cover"
          // resizeMethod="resize"
          style={{
            ...styles.image,
            marginBottom: 32,
          }}
        />
      }
      ListEmptyComponent={<Text>Пустота</Text>}
      renderItem={({ item }) => <CommentsPostItem item={item} ownerPost={ownerPost} />}
      keyExtractor={(item, index) => item.timestamp || index}
      getItemLayout={(data, index) => ({ length: 150, offset: 150 * index + 250, index })}
      initialScrollIndex={comments.length > 10 ? comments.length - 10 : 0}
    />
  );
};

export default CommentsPostList;
