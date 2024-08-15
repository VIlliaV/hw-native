import React from "react";
import { View } from "react-native";
import Social from "../social/Social";

const PostBar = () => {
  const amountLike = 0;
  return (
    <View>
      <Social />
      {!!amountLike && <Social social="like" amount={amountLike} />}
    </View>
  );
};

export default PostBar;
