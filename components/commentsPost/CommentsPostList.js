import { FlatList, View, ActivityIndicator } from 'react-native';
import { styles } from '../../style';
import CommentsPostItem from './CommentsPostItem';
import { useEffect, useRef } from 'react';
import Plug from '../Plug';
import { usePosts } from '../../utils/hooks';
import CustomImage from '../CustomImage';

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
        <CustomImage
          source={postImage}
          resizeMode="cover"
          style={{
            ...styles.image,
            marginBottom: 32,
          }}
        />
      }
      ListEmptyComponent={<Plug height={140}>Ще немає коментарів, будьте першим</Plug>}
      renderItem={({ item }) => <CommentsPostItem item={item} ownerPost={ownerPost} />}
      keyExtractor={(item, index) => item.timestamp || index.toString()}
      getItemLayout={(data, index) => ({ length: 150, offset: 150 * index + 250, index })}
      initialScrollIndex={comments.length > 10 ? comments.length - 10 : 0}
    />
  );
};

export default CommentsPostList;
