import { FlatList, Image, View } from 'react-native';
import postPhoto from '../../assets/image/postPhoto.jpg';
import { styles } from '../../style/styles';
import CommentsPostItem from './CommentsPostItem';

const jsonCommentsData = require('../../base/comments.json');

const CommentsPostList = ({ comments }) => {
  // const { comments } = jsonCommentsData;
  return (
    <FlatList
      data={comments}
      style={{ minHeight: '100%' }}
      ListFooterComponent={<View style={{ height: 50, marginBottom: 34 }}></View>}
      ListHeaderComponent={
        <Image
          source={postPhoto}
          resizeMode="cover"
          style={{
            ...styles.image,
            marginBottom: 32,
          }}
        />
      }
      renderItem={({ item }) => <CommentsPostItem item={item} />}
      keyExtractor={item => item.id}
    />
  );
};

export default CommentsPostList;
