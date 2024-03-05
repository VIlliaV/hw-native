import { StatusBar } from "expo-status-bar";
import { Text, View, ImageBackground, Platform } from "react-native";

import { useFonts } from "expo-font";
import { styles } from "./style/styles";

import back_ground from "./assets/image/Photo BG.webp";
import back_ground_2x from "./assets/image/Photo BGx2.webp";
import RegistrationScreen from "./components/auth/RegistrationScreen";

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
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={Platform.OS === "ios" ? back_ground_2x : back_ground}
        resizeMode="cover"
        style={{ ...styles.image, justifyContent: "flex-end" }}
      >
        <RegistrationScreen />
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}
