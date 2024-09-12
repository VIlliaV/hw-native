import { Image, Text, View } from 'react-native';
import { styles } from '../../style/styles';
import postPhoto from '../../assets/image/postPhoto.jpg';
import PostBar from './PostBar';
import { color } from '../../style/color';

const Post = ({ item, showCity }) => {
  return (
    <View style={{ gap: 8, paddingBottom: 32 }}>
      <View style={{ height: 240 }}>
        <Image
          source={{ uri: item.urlPhoto }}
          resizeMode="cover"
          style={{
            ...styles.image,
          }}
        />
      </View>
      <Text
        style={{
          fontFamily: 'Roboto-Medium',
          fontSize: 16,
          color: color.primary,
        }}
      >
        {item.name}
      </Text>
      <PostBar props={item} showCity={showCity} />
    </View>
  );
};

export default Post;
