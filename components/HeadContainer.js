import { View } from 'react-native';
import { color } from '../style';

const HeadContainer = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        backgroundColor: color.bg,
        paddingHorizontal: 16,
        paddingTop: 32,
      }}
    >
      {children}
    </View>
  );
};

export default HeadContainer;
