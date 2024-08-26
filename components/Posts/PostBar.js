import React from "react";
import { View } from "react-native";
import Social from "../social/Social";
import Location from "../social/Location";

const PostBar = ({ props, showCity }) => {
  const { amountLike, amountComment } = props;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 4,
      }}
    >
      <View style={{ flexDirection: "row", gap: 24 }}>
        <Social amount={amountComment} />
        {!!amountLike && <Social social="like" amount={amountLike} />}
      </View>

      <Location props={props} showCity={showCity} />
    </View>
  );
};

export default PostBar;
