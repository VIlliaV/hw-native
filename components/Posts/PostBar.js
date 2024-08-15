import React from "react";
import { View } from "react-native";
import Social from "../social/Social";
import Location from "../social/Location";

const PostBar = () => {
  const amountLike = 10;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 4,
      }}
    >
      <View style={{ flexDirection: "row", gap: 24 }}>
        <Social />
        {!!amountLike && <Social social="like" amount={amountLike} />}
      </View>

      <Location />
    </View>
  );
};

export default PostBar;
