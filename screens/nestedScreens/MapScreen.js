import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { color } from '../../style';
import { useRoute } from '@react-navigation/native';

const MapScreen = () => {
  const {
    params: { markerCoords, name, description },
  } = useRoute();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      const location = await Location.getCurrentPositionAsync({});

      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setLocation(coords);
    };
    getLocation();
  }, []);

  const startPosition = markerCoords || location;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          ...startPosition,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true}
        mapType="standard"
        cameraZoomRange={{
          minCenterCoordinateDistance: 300,
          animated: false,
        }}
      >
        {location && <Marker title="ти тут" coordinate={location} pinColor={color.accent} />}
        {markerCoords && <Marker title={name} coordinate={markerCoords} description={description} />}
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
