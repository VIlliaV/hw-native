import { FlatList, ImageBackground, Platform, Text, View } from 'react-native';
import back_ground from '../../assets/image/Photo BG.webp';
import back_ground_2x from '../../assets/image/Photo BGx2.webp';
import ProfileBox from '../../components/ProfileBox';
import { styles } from '../../style/styles';
import Post from '../../components/post/Post';
import { color } from '../../style/color';
import { updateUserProfile } from '../../redux/auth/authOperations';
import { useDispatch } from 'react-redux';
import { getQueryDataFromFirestore } from '../../utils/firebase';
import { usePosts } from '../../utils/hooks/usePosts';
import { useAuth } from '../../utils/hooks/useAuth';
import { useEffect, useState } from 'react';
import { fetchPosts } from '../../redux/posts/postOperations';
import { actUpdatePostItem, actUpdatePostOwnerItem } from '../../redux/posts/postSlice';

const jsonData = require('../../base/posts.json');

const ProfileScreen = ({ route }) => {
  const { postsOwners } = usePosts();
  const { user } = useAuth();

  const [loadMore, setLoadMore] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchPosts({
        collectionName: 'posts',
        sort: ['timestamp', 'desc'],
        queryDoc: ['owner', '==', user.uid],
        stateForChange: 'postsOwners',
      })
    );
  }, []);

  // const postsOwner = posts.filter(post => post.owner === user.uid);
  // postsOwner.sort((a, b) => b.timestamp - a.timestamp);

  // getQueryDataFromFirestore('posts', 'owner', 'UTQjHAVytld3L5Yo2UQ2wjKErkz2');

  const changeAvatar = async photoURL => {
    dispatch(updateUserProfile({ ...photoURL }));
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
    if (!postsOwners.length) return;
    setLoadMore(true);
    const lastDocId = postsOwners[postsOwners.length - 1]?.id || null;
    const fetchData = await dispatch(
      fetchPosts({
        collectionName: 'posts',
        queryDoc: ['owner', '==', user.uid],
        sort: ['timestamp', 'desc'],
        lastVisible: lastDocId,
        stateForChange: 'postsOwners',
      })
    ).unwrap();
    if (fetchData.postData.length === 0) {
      setLoadMore('no more');
    } else {
      setLoadMore(false);
    }
  };

  return (
    <>
      <ImageBackground
        source={Platform.OS === 'ios' ? back_ground_2x : back_ground}
        resizeMode="cover"
        style={{
          ...styles.bg_image,
          justifyContent: 'flex-end',
        }}
      >
        {/* <View style={{ height: "85%", backgroundColor: color.bg }}> */}
        <ProfileBox route={route} changeAvatar={changeAvatar} style={{ height: '85%', backgroundColor: color.bg }}>
          <FlatList
            data={postsOwners}
            // ListFooterComponent={
            //   <View style={{ height: 0, marginBottom: 0 }}></View>
            // }
            renderItem={({ item }) => <Post item={item} showCity={false} />}
            keyExtractor={(item, index) => index}
            ListFooterComponent={
              loadMore && loadMore === 'no more' ? <Text>більше нема постів</Text> : loadMore && <Text>чекай</Text>
            }
            ListEmptyComponent={<Text>Пустота</Text>}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            onEndReached={() => {
              !loadMore && onEndReached();
            }}
            onEndReachedThreshold={0.5}
          />
        </ProfileBox>
        {/* </View> */}
      </ImageBackground>
    </>
  );
};

export default ProfileScreen;
