import LocationSVG from '../SVGComponents/LocationSVG';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles, color } from '../../style';
import { useNavigation } from '@react-navigation/native';

const Location = ({ props, showCity = true }) => {
  const { description, country = 'Ukraine', coords, name } = props;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styleLocation.container}
      activeOpacity={0.6}
      onPress={() =>
        navigation.navigate('Nested', { screen: 'MapScreen', params: { markerCoords: coords, description, name } })
      }
    >
      <LocationSVG />
      <View style={styleLocation.box}>
        <Text style={styleLocation.text}>
          {showCity && `${description}, `}
          {country}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Location;

const styleLocation = {
  container: {
    flexDirection: 'row',
    flexShrink: 1,
    flexGrow: 0,
    gap: 4,
    alignItems: 'center',
  },
  box: {
    flexDirection: 'row',
    flexShrink: 1,
    flexGrow: 0,
    flexWrap: 'wrap',
  },
  text: {
    ...styles.text,
    textAlignVertical: 'none',
    color: color.primary,
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
};
