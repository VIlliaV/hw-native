import { FlatList } from 'react-native';

import Post from './Post';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Toast from 'react-native-toast-message';
import { usePosts } from '../../utils/hooks/usePosts';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../config';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../../redux/posts/postOperations';
// import { fetchPosts } from '../../redux/posts/postSlice';
import { IOFlatList } from 'react-native-intersection-observer';
import { actUpdatePost } from '../../redux/posts/postSlice';

const PostList = ({ showCity = true }) => {
  const { posts } = usePosts();

  const dispatch = useDispatch();
  // useEffect(() => {
  //   const unsubscribe = onSnapshot(collection(db, 'posts'), snapshot => {
  //     const postsData = snapshot.docs.map(doc => {
  //       const data = doc.data();
  //       data.timestamp = data.timestamp?.toMillis() || Date.now();
  //       data.id = doc.id;
  //       return data;
  //     });
  //     dispatch(fetchPosts(postsData));
  //   });
  //   return () => {
  //     console.log('unScribe');
  //     unsubscribe();
  //   };
  // }, []);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchPosts({ collectionName: 'posts', sort: ['timestamp', 'desc'] }));
    setRefreshing(false);
  }, []);

  const viewabilityConfig = {
    minimumViewTime: 3000,
    viewAreaCoveragePercentThreshold: 20,
  };

  const onViewableItemsChanged = ({ changed, viewableItems }) => {
    viewableItems.forEach(item => {
      // console.log(item?.item.name, item?.isViewable);
    });
    changed.forEach(item => {
      const data = { ...item?.item };
      data.inView = item?.isViewable;
      dispatch(actUpdatePost({ idPost: item?.item.id, update: data }));
    });
  };

  // const sortedPosts = [...posts].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <FlatList
      data={posts}
      // style={{ marginTop: 100 }}
      renderItem={({ item }) => <Post item={item} showCity={showCity} />}
      keyExtractor={item => item.id}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
    />
  );
};

export default PostList;
