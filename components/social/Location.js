import React from "react";
import LocationSVG from "../SVGComponents/LocationSVG";
import { Text, View } from "react-native";
import { styles } from "../../style/styles";
import { color } from "../../style/color";

const Location = () => {
  const location = "Ivano-Frankivs'k Region, Ukraine";
  return (
    <View style={{ flexDirection: "row", gap: 4, justifyContent: "center" }}>
      <LocationSVG />
      <Text
        style={{
          ...styles.text,
          color: color.primary,
        }}
      >
        {location}
      </Text>
    </View>
  );
};

export default Location;
