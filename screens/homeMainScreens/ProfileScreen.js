import { FlatList, ImageBackground, Platform, Text, View } from 'react-native';
import back_ground from '../../assets/image/Photo BG.webp';
import back_ground_2x from '../../assets/image/Photo BGx2.webp';
import ProfileBox from '../../components/ProfileBox';
import { styles } from '../../style/styles';
import Post from '../../components/post/Post';
import { color } from '../../style/color';
import { updateUserProfile } from '../../redux/auth/authOperations';
import { useDispatch } from 'react-redux';

const jsonData = require('../../base/posts.json');

const ProfileScreen = ({ route }) => {
  const { posts } = jsonData;
  const dispatch = useDispatch();

  const changeAvatar = async photoURL => {
    await dispatch(updateUserProfile({ ...photoURL })).unwrap();
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
            data={posts}
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
