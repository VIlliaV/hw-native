import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
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
  map: {
    width: "100%",
    height: "100%",
  },
});
