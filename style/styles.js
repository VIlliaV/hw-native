import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontFamily: "Roboto-Medium",
    ...Platform.select({
      ios: {
        fontSize: 30,
      },
      android: {
        color: "#ffffff",
      },
    }),
  },
});
