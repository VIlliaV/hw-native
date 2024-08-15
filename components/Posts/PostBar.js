import React from "react";
import { View } from "react-native";
import Social from "../social/Social";
import Location from "../social/Location";

const PostBar = () => {
  const amountLike = 0;
  return (
    <View>
      <Social />
      {!!amountLike && <Social social="like" amount={amountLike} />}
      <Location />
    </View>
  );
};

export default PostBar;
