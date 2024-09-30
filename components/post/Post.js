import { Image, Text, View } from 'react-native';
import { styles, color } from '../../style';
import PostBar from './PostBar';
import noPhoto from '../../assets/image/noPhoto.png';
import { useDocSubscription } from '../../utils';

const Post = ({ item, showCity }) => {
  const { name, urlPhoto, id, inView } = item;

  useDocSubscription('posts', id, inView);

  return (
    <View style={{ gap: 8, paddingBottom: 32 }}>
      <View style={{ height: 240 }}>
        <Image
          source={urlPhoto ? { uri: urlPhoto } : noPhoto}
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
        {name}
      </Text>
      <PostBar props={item} showCity={showCity} />
    </View>
  );
};

export default Post;
