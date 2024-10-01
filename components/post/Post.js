import { Text, View } from 'react-native';
import { styles, color } from '../../style';
import PostBar from './PostBar';
import { useDocSubscription } from '../../utils/hooks';
import CustomImage from '../CustomImage';

const Post = ({ item, showCity }) => {
  const { name, urlPhoto, id, inView } = item;

  useDocSubscription({ collectionName: 'posts', id, inView });

  return (
    <View style={{ gap: 8, paddingBottom: 32 }}>
      <View style={{ height: 240 }}>
        <CustomImage source={urlPhoto} resizeMode="cover" style={styles.image} />
      </View>
      <Text style={stylePost.text}>{name}</Text>
      <PostBar props={item} showCity={showCity} />
    </View>
  );
};

export default Post;

const stylePost = {
  text: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: color.primary,
  },
};
