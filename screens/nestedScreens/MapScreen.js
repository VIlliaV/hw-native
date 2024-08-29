import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

const MapScreen = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        // provider="google"
        region={{
          ...location,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true}
        mapType="standard"
        minZoomLevel={18}
        cameraZoomRange={{
          minCenterCoordinateDistance: 300,
          // maxCenterCoordinateDistance: 50000,
          animated: false,
        }}
        onMapReady={() => console.log("Map is ready")}
        onRegionChange={() => console.log("Region change")}
        // loadingEnabled={true}
      >
        {location && (
          <Marker title="I am here" coordinate={location} description="Hello" />
        )}
      </MapView>
    </View>
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //   <Text>MapScreen!</Text>
    // </View>
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
