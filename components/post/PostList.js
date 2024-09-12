import { FlatList } from 'react-native';

import Post from './Post';
import { getDataFromFirestore } from '../../utils/firebase';
import { useEffect, useState } from 'react';

// const jsonData = require('../../base/posts.json');

const PostList = ({ showCity = true }) => {
  const [posts, setPosts] = useState([]);
  const getPostsData = async () => {
    try {
      const postsData = await getDataFromFirestore();
      setPosts(postsData);
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
  };

  useEffect(() => {
    getPostsData();
  }, []);

  console.log('🚀 ~ posts:', posts);

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
