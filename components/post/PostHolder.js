import { Image, Text, View } from 'react-native';
import { styles } from '../../style/styles';
import avatar from '../../assets/image/avatarImage.jpg';

const PostHolder = () => {
  return (
    <View style={{ flexDirection: 'row', gap: 8, marginBottom: 32 }}>
      <View style={{ width: 60, height: 60 }}>
        <Image
          source={avatar}
          resizeMode="cover"
          style={{
            ...styles.image,
            borderRadius: 16,
            width: 60,
            height: 60,
          }}
        />
      </View>
      <View style={{ justifyContent: 'center' }}>
        <Text style={styles.subText}>Natali Romanova</Text>
        <Text style={styleHolder.subtext}>email@example.com</Text>
      </View>
    </View>
  );
};

export default PostHolder;

const styleHolder = {
  subtext: {
    color: 'rgba(33, 33, 33, 0.8)',
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
  },
};
