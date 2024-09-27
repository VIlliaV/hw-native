import { FlatList, Image, View } from 'react-native';
import { styles } from '../../style/styles';
import CommentsPostItem from './CommentsPostItem';
import noPhoto from '../../assets/image/noPhoto.png';
import { useEffect, useRef } from 'react';

const CommentsPostList = ({ comments, postImage, ownerPost }) => {
  const flatListCommentsRef = useRef(null);

  // useEffect(() => {
  //   // if (flatListCommentsRef.current) {
  //   flatListCommentsRef.current.scrollToEnd({ animated: true });
  //   // }
  // }, [comments]);

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
      renderItem={({ item }) => <CommentsPostItem item={item} ownerPost={ownerPost} />}
      keyExtractor={item => item.timestamp}
    />
  );
};

export default CommentsPostList;
