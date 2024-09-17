import React from 'react';
import LocationSVG from '../SVGComponents/LocationSVG';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../style/styles';
import { color } from '../../style/color';
import { useNavigation } from '@react-navigation/native';

const Location = ({ props, showCity = true }) => {
  const { description, country = 'Ukraine', coords, name } = props;

  const navigation = useNavigation();
  return (
    // <View
    //   style={{
    //     flexDirection: 'row',
    //     flexShrink: 1,
    //     flexGrow: 0,
    //     gap: 4,
    //     alignItems: 'center',
    //   }}
    // >
    <TouchableOpacity
      // style={{ ...styleComments.sendSVG }}
      style={{
        flexDirection: 'row',
        flexShrink: 1,
        flexGrow: 0,
        gap: 4,
        alignItems: 'center',
      }}
      activeOpacity={0.6}
      onPress={() =>
        navigation.navigate('Nested', { screen: 'MapScreen', params: { markerCoords: coords, description, name } })
      }
    >
      <LocationSVG />
      <View
        style={{
          flexDirection: 'row',
          flexShrink: 1,
          flexGrow: 0,
          flexWrap: 'wrap',
        }}
      >
        <Text
          style={{
            ...styles.text,
            textAlignVertical: 'none',
            color: color.primary,
            textAlign: 'right',
            textDecorationLine: 'underline',
          }}
        >
          {showCity && `${description}, `}
          {country}
        </Text>
      </View>
    </TouchableOpacity>
    // </View>
  );
};

export default Location;
