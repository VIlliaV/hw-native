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
    position: "relative",
    // justifyContent: "flex-start",
  },
  popUp: {
    position: "relative",
    backgroundColor: color.bg,
    paddingHorizontal: 16,
    // paddingTop: 32,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textAlignVertical: "bottom",
  },
  textInput: {
    width: "100%",
    // height: 51,
    padding: 16,
    marginBottom: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: color.primary,
    backgroundColor: color.bg_secondary,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: color.border,
  },
  button: {
    width: "100%",
    padding: 16,
    marginBottom: 16,
    borderRadius: 100,
    color: color.bg,
    backgroundColor: color.accent,
    alignItems: "center",
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    textAlign: "center",
    lineHeight: 35,
    color: color.primary,
    //? just for test:
    // ...Platform.select({
    //   ios: {
    //     fontSize: 30,
    //   },
    //   android: {
    //     fontFamily: "Roboto-Medium",
    //   },
    // }),
  },
});
