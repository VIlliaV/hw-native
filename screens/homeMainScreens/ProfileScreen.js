import { ActivityIndicator, FlatList, ImageBackground, Platform, Text } from 'react-native';
import back_ground from '../../assets/image/Photo BG.webp';
import back_ground_2x from '../../assets/image/Photo BGx2.webp';
import ProfileBox from '../../components/ProfileBox';
import { styles, color } from '../../style';
import Post from '../../components/post/Post';
import { updateUserProfile } from '../../redux/auth/authOperations';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchPosts } from '../../redux/posts/postOperations';
import { actUpdatePostItem } from '../../redux/posts/postSlice';
import Plug from '../../components/Plug';
import { useAuth, usePosts } from '../../utils';

const ProfileScreen = ({ route }) => {
  const { postsOwners, isLoadingPostsOwners } = usePosts();
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
        <ProfileBox route={route} changeAvatar={changeAvatar} style={{ height: '85%', backgroundColor: color.bg }}>
          {isLoadingPostsOwners && !postsOwners.length ? (
            <ActivityIndicator size="large" />
          ) : (
            <FlatList
              data={postsOwners}
              renderItem={({ item }) => <Post item={item} showCity={false} />}
              keyExtractor={(item, index) => index}
              ListFooterComponent={
                loadMore && loadMore === 'no more' ? (
                  <Plug height={240}>Більше немає постів</Plug>
                ) : (
                  loadMore && <Text>чекай</Text>
                )
              }
              ListEmptyComponent={<Plug height={240}>Зробіть свій перший пост</Plug>}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
              onEndReached={() => {
                !loadMore && onEndReached();
              }}
              onEndReachedThreshold={0.5}
            />
          )}
        </ProfileBox>
      </ImageBackground>
    </>
  );
};

export default ProfileScreen;
