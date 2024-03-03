import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  ImageBackground,
  Platform,
  StyleSheet,
} from "react-native";

import { useFonts } from "expo-font";
import { styles } from "./style/styles";

import back_ground from "./assets/image/Photo BG.webp";
import back_ground_2x from "./assets/image/Photo BGx2.webp";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>loading</Text>;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={Platform.OS === "ios" ? back_ground_2x : back_ground}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.text}>Hello KeT</Text>
        <Text style={styles.title}>Hello KeT</Text>
        <Text style={{ fontFamily: "Roboto-Bold" }}>Hello </Text>
        <Text style={{ fontFamily: "Inter-Medium" }}>Hello KeT</Text>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   image: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   text: {
//     fontFamily: "Roboto-Regular",
//     ...Platform.select({
//       ios: {
//         fontSize: 30,
//       },
//       android: {
//         color: "#ffffff",
//       },
//     }),
//   },
// });
