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
import { useEffect } from 'react';
import { fetchPostsOwners } from '../../redux/posts/postOperations';

const jsonData = require('../../base/posts.json');

const ProfileScreen = ({ route }) => {
  const { postsOwners } = usePosts();
  const { user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchPostsOwners({ collectionName: 'posts', sort: ['timestamp', 'desc'], queryDoc: ['owner', '==', user.uid] })
    );
  }, []);

  // const postsOwner = posts.filter(post => post.owner === user.uid);
  // postsOwner.sort((a, b) => b.timestamp - a.timestamp);

  // getQueryDataFromFirestore('posts', 'owner', 'UTQjHAVytld3L5Yo2UQ2wjKErkz2');

  const changeAvatar = async photoURL => {
    dispatch(updateUserProfile({ ...photoURL }));
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
            keyExtractor={item => item.id}
          />
        </ProfileBox>
        {/* </View> */}
      </ImageBackground>
    </>
  );
};

export default ProfileScreen;
