import React from "react";
import LocationSVG from "../SVGComponents/LocationSVG";
import { Text, View } from "react-native";
import { styles } from "../../style/styles";
import { color } from "../../style/color";

const Location = () => {
  const city = "Ivano-Frankivs'k Region, ";
  const country = "Ukraine";
  return (
    <View
      style={{
        flexDirection: "row",
        flexShrink: 1,
        flexGrow: 0,
        gap: 4,
        alignItems: "center",
      }}
    >
      <LocationSVG />
      <View
        style={{
          flexDirection: "row",
          flexShrink: 1,
          flexGrow: 0,
          flexWrap: "wrap",
        }}
      >
        <Text
          style={{
            ...styles.text,
            textAlignVertical: "none",
            color: color.primary,
            textAlign: "right",
            textDecorationLine: "underline",
          }}
        >
          {city}
          {country}
        </Text>
      </View>
    </View>
  );
};

export default Location;
