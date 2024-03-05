import { StyleSheet, Platform } from "react-native";
import { color } from "./color";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bg,
    paddingHorizontal: 16,
  },
  image: {
    flex: 1,
    // justifyContent: "flex-start",
  },
  popUp: {
    position: "relative",
    justifyContent: "flex-end",
    backgroundColor: color.bg,
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  text: {
    fontFamily: "Roboto-Regular",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: "80%",
    marginBottom: 43,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    textAlign: "center",
    lineHeight: 35,
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
