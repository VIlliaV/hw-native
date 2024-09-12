import { View } from 'react-native';
import Social from '../social/Social';
import Location from '../social/Location';

const PostBar = ({ props, showCity }) => {
  const { like = [1, 2], comments } = props;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 4,
      }}
    >
      <View style={{ flexDirection: 'row', gap: 24 }}>
        <Social amount={comments?.length} />
        <Social social="like" amount={like?.length} />
      </View>

      <Location props={props} showCity={showCity} />
    </View>
  );
};

export default PostBar;
