import React from 'react';
import LocationSVG from '../SVGComponents/LocationSVG';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../style/styles';
import { color } from '../../style/color';
import { useNavigation } from '@react-navigation/native';

const Location = ({ props, showCity = true }) => {
  const { description, country } = props;
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        flexShrink: 1,
        flexGrow: 0,
        gap: 4,
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        // style={{ ...styleComments.sendSVG }}
        activeOpacity={0.6}
        onPress={() => navigation.navigate('Nested', { screen: 'MapScreen' })}
      >
        <LocationSVG />
      </TouchableOpacity>
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
          {showCity && description}
          {country}
        </Text>
      </View>
    </View>
  );
};

export default Location;
