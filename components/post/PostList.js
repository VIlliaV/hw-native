import { ActivityIndicator, FlatList, Text } from 'react-native';

import Post from './Post';

import { useEffect, useRef, useState } from 'react';
import { usePosts } from '../../utils/hooks/usePosts';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../../redux/posts/postOperations';
import { actUpdatePostItem, clearPosts } from '../../redux/posts/postSlice';
import { useNavigation, useRoute } from '@react-navigation/native';
import Plug from '../Plug';

const PostList = ({ showCity = true }) => {
  const route = useRoute();
  const navigation = useNavigation();

  const { posts, isLoadingPosts } = usePosts();

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
    if (refreshing || !posts.length) return;
    setLoadMore(true);
    const lastDocId = posts[posts.length - 1]?.id || null;
    const fetchData = await dispatch(
      fetchPosts({ collectionName: 'posts', sort: ['timestamp', 'desc'], lastVisible: lastDocId })
    ).unwrap();
    if (fetchData.postData.length === 0) {
      setLoadMore('no more');
    } else {
      setLoadMore(false);
    }
  };

  return isLoadingPosts && !posts.length ? (
    <ActivityIndicator size="large" />
  ) : (
    <FlatList
      ref={flatListRef}
      data={posts}
      // style={{ marginTop: 100 }}
      renderItem={({ item }) => <Post item={item} showCity={showCity} />}
      keyExtractor={item => item.id}
      ListFooterComponent={
        loadMore && loadMore === 'no more' ? (
          <Plug height={240}>Більше немає постів</Plug>
        ) : (
          loadMore && <ActivityIndicator size="large" />
        )
      }
      ListEmptyComponent={<Plug height={240}>Зробіть свій перший пост</Plug>}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      onEndReached={() => {
        !loadMore && onEndReached();
      }}
      onEndReachedThreshold={0.1}
    />
  );
};

export default PostList;
