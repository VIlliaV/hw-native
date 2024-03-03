import { StyleSheet, Platform } from "react-native";
import { color } from "./color";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontFamily: "Roboto-Regular",
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: color.primary,
    //? just for test:
    ...Platform.select({
      ios: {
        fontSize: 30,
      },
      android: {
        fontFamily: "Roboto-Medium",
      },
    }),
  },
});
