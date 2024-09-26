import { FlatList, Image, View } from 'react-native';
import postPhoto from '../../assets/image/postPhoto.jpg';
import { styles } from '../../style/styles';
import CommentsPostItem from './CommentsPostItem';
import noPhoto from '../../assets/image/noPhoto.png';

const jsonCommentsData = require('../../base/comments.json');

const CommentsPostList = ({ comments, postImage, ownerPost }) => {
  // const { comments } = jsonCommentsData;
  return (
    <FlatList
      data={comments}
      style={{ minHeight: '100%' }}
      ListFooterComponent={<View style={{ height: 50, marginBottom: 34 }}></View>}
      ListHeaderComponent={
        <Image
          source={postImage ? { uri: postImage } : noPhoto}
          resizeMode="cover"
          style={{
            ...styles.image,
            marginBottom: 32,
          }}
        />
      }
      renderItem={({ item }) => <CommentsPostItem item={item} ownerPost={ownerPost} />}
      keyExtractor={item => item.timestamp}
    />
  );
};

export default CommentsPostList;
