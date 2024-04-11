import { Text, View } from "react-native";

import { useFonts } from "expo-font";
import RegistrationScreen from "./components/auth/RegistrationScreen";
import LoginScreen from "./components/auth/LoginScreen";

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
      <RegistrationScreen />

      {/* <LoginScreen /> */}
    </View>
  );
}
