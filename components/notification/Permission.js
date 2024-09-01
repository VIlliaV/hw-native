import React from "react";
import { Button, Text, View } from "react-native";
import { color } from "../../style/color";

const Permission = ({
  text,
  permissionFunction = () => {},
  status = "denied",
}) => {
  return (
    <View style={stylePermission.container}>
      <Text style={stylePermission.message}>потрібен дозвіл на {text}</Text>
      {status === "denied" ? (
        <Text style={stylePermission.message}>
          змініть дозвіл на {text} в налаштуваннях{" "}
        </Text>
      ) : (
        <Button onPress={permissionFunction} title="надати дозвіл" />
      )}
    </View>
  );
};

export default Permission;

const stylePermission = {
  container: {
    position: "absolute",
    width: "100%",
    height: 200,
    flex: 1,
    justifyContent: "center",
    backgroundColor: color.bg,
    zIndex: 1,
    borderWidth: 1,
    borderColor: color.placeholder,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
};
