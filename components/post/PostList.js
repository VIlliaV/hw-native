import { FlatList, Text } from 'react-native';

import Post from './Post';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Toast from 'react-native-toast-message';
import { usePosts } from '../../utils/hooks/usePosts';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../config';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../../redux/posts/postOperations';
// import { fetchPosts } from '../../redux/posts/postSlice';
import { IOFlatList } from 'react-native-intersection-observer';
import { actUpdatePost, actUpdatePostItem, clearPosts } from '../../redux/posts/postSlice';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

const PostList = ({ showCity = true }) => {
  const route = useRoute();
  const navigation = useNavigation();

  const { posts } = usePosts();

  const dispatch = useDispatch();

  const flatListRef = useRef(null);
  useEffect(() => {
    if (route.params?.from === 'CreatePostScreen' && flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      navigation.setParams({ from: '' });
    }
  }, [route]);

  const [refreshing, setRefreshing] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(clearPosts());
    await dispatch(fetchPosts({ collectionName: 'posts', sort: ['timestamp', 'desc'] })).unwrap();
    setRefreshing(false);
    setLoadMore(false);
  };

  const viewabilityConfig = {
    minimumViewTime: 3000,
    viewAreaCoveragePercentThreshold: 20,
  };

  const onViewableItemsChanged = ({ changed, viewableItems }) => {
    viewableItems.forEach(item => {
      // console.log(item?.item.name, item?.isViewable);
    });
    changed.forEach(item => {
      dispatch(actUpdatePostItem({ idPost: item?.item.id, update: item?.isViewable, key: 'inView' }));
    });
  };

  const onEndReached = async () => {
    if (refreshing) return;
    setLoadMore(true);
    const lastDocId = posts[posts.length - 1]?.id || null;
    const testData = await dispatch(
      fetchPosts({ collectionName: 'posts', sort: ['timestamp', 'desc'], lastVisible: lastDocId })
    ).unwrap();
    if (testData.postData.length === 0) {
      setLoadMore('no more');
    } else {
      setLoadMore(false);
    }
  };

  return (
    <FlatList
      ref={flatListRef}
      data={posts}
      // style={{ marginTop: 100 }}
      renderItem={({ item }) => <Post item={item} showCity={showCity} />}
      keyExtractor={item => item.id}
      ListFooterComponent={
        loadMore && loadMore === 'no more' ? <Text>більше нема постів</Text> : loadMore && <Text>чекай</Text>
      }
      refreshing={refreshing}
      onRefresh={onRefresh}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      onEndReached={() => {
        !loadMore && onEndReached();
      }}
      onEndReachedThreshold={0.5}
    />
  );
};

export default PostList;
