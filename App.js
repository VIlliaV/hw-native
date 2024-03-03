import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { styles } from "./style/styles";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello Ketty</Text>
      <StatusBar style="auto" />
    </View>
  );
}
