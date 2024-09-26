import { View } from 'react-native';
import Social from '../social/Social';
import Location from '../social/Location';

const PostBar = ({ props, showCity }) => {
  const { like, comments, id } = props;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 4,
      }}
    >
      <View style={{ flexDirection: 'row', gap: 24 }}>
        <Social data={comments} idPost={id} />
        <Social social="like" data={like} idPost={id} />
      </View>

      <Location props={props} showCity={showCity} />
    </View>
  );
};

export default PostBar;
