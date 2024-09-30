import { Text, View } from 'react-native';
import { styles, color } from '../style';

const Plug = ({ width = '100%', height = '100%', children = "скоро тут щось з'явиться" }) => {
  return (
    <View
      style={{
        ...styles.image,
        width,
        height,
        backgroundColor: color.primary,
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
      }}
    >
      <Text style={{ ...styles.title, color: color.bg_secondary }}>{children}</Text>
    </View>
  );
};

export default Plug;
