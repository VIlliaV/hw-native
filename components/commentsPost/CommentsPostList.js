import { FlatList, Image, View, ActivityIndicator } from 'react-native';
import { styles } from '../../style';
import CommentsPostItem from './CommentsPostItem';
import noPhoto from '../../assets/image/noPhoto.png';
import { useEffect, useRef } from 'react';
import Plug from '../Plug';
import { usePosts } from '../../utils';

const CommentsPostList = ({ comments, postImage, ownerPost }) => {
  const flatListCommentsRef = useRef(null);
  const { isLoadingComments } = usePosts();

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
      ListFooterComponent={
        <>
          {isLoadingComments && <ActivityIndicator size="large" />}
          <View style={{ height: isLoadingComments ? 100 : 50, marginBottom: 34 }}></View>
        </>
      }
      ListHeaderComponent={
        <Image
          source={postImage ? { uri: postImage } : noPhoto}
          resizeMode="cover"
          style={{
            ...styles.image,
            marginBottom: 32,
          }}
        />
      }
      ListEmptyComponent={<Plug height={140}>Ще немає коментарів, будьте першим</Plug>}
      renderItem={({ item }) => <CommentsPostItem item={item} ownerPost={ownerPost} />}
      keyExtractor={(item, index) => item.timestamp || index}
      getItemLayout={(data, index) => ({ length: 150, offset: 150 * index + 250, index })}
      initialScrollIndex={comments.length > 10 ? comments.length - 10 : 0}
    />
  );
};

export default CommentsPostList;
