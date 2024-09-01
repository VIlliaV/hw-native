import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
// import avatarImage from "../../assets/image/avatarPNG.png";
import { color } from "../../style/color";

const MapScreen = () => {
  const [location, setLocation] = useState(null);

  const name = "marker";
  const description = "description";
  const locationMarker = {
    latitude: 49.81122943769388,
    longitude: 24.024978248853097,
  };
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

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        // provider="google"
        region={{
          ...locationMarker,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true}
        mapType="standard"
        // minZoomLevel={18}
        cameraZoomRange={{
          minCenterCoordinateDistance: 300,
          // maxCenterCoordinateDistance: 50000,
          animated: false,
        }}
        // onMapReady={() => console.log("Map is ready")}
        // onRegionChange={() => console.log("Region change")}
        // loadingEnabled={true}
      >
        {location && (
          <Marker
            title="ти тут"
            coordinate={location}
            // image={avatarImage}
            pinColor={color.accent}
          />
        )}
        {locationMarker && (
          <Marker
            title={name}
            coordinate={locationMarker}
            description={description}
          />
        )}
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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
