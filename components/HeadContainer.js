import { View } from 'react-native';
import { color } from '../style/color';

const HeadContainer = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        backgroundColor: color.bg,
        paddingHorizontal: 16,
        paddingTop: 32,
        // paddingBottom: 84,
        // minHeight: "100%",
      }}
    >
      {children}
    </View>
  );
};

export default HeadContainer;
