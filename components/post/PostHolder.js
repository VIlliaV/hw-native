import { Text, View } from 'react-native';
import { styles } from '../../style';
import { useAuth } from '../../utils/hooks';
import CustomImage from '../CustomImage';

const PostHolder = () => {
  const { user } = useAuth();
  const { displayName, email, photoURL } = user;

  return (
    <View style={styleHolder.container}>
      <View style={styleHolder.box}>
        <CustomImage source={photoURL} resizeMode="cover" style={styleHolder.img} />
      </View>
      <View style={{ justifyContent: 'center' }}>
        <Text style={styles.subText}>{displayName}</Text>
        <Text style={styleHolder.subtext}>{email}</Text>
      </View>
    </View>
  );
};

export default PostHolder;

const styleHolder = {
  container: { flexDirection: 'row', gap: 8, marginBottom: 32 },
  box: { width: 60, height: 60 },
  img: {
    ...styles.image,
    borderRadius: 16,
    width: 60,
    height: 60,
  },
  subtext: {
    color: 'rgba(33, 33, 33, 0.8)',
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
  },
};
