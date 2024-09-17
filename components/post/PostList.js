import { FlatList } from 'react-native';

import Post from './Post';
import { getDataFromFirestore } from '../../utils/firebase';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { usePosts } from '../../utils/hooks/usePosts';

// const jsonData = require('../../base/posts.json');

const PostList = ({ showCity = true }) => {
  const { posts } = usePosts();
  return (
    <FlatList
      data={posts}
      // style={{ marginTop: 100 }}
      renderItem={({ item }) => <Post item={item} showCity={showCity} />}
      keyExtractor={item => item.id}
    />
  );
};

export default PostList;
