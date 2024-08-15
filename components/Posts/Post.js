import { View, Image, Text } from "react-native";
import postPhoto from "../../assets/image/postPhoto.jpg";
import { styles } from "../../style/styles";
import PostBar from "./PostBar";
import { color } from "../../style/color";

const Post = () => {
  const nameOfPost = "Ліс";
  return (
    <View style={{ gap: 8 }}>
      <View style={{ height: 240 }}>
        <Image
          source={postPhoto}
          resizeMode="cover"
          style={{
            ...styles.image,
            borderRadius: 8,
            width: "100%",
            height: 240,
          }}
        />
      </View>
      <Text
        style={{
          fontFamily: "Roboto-Medium",
          fontSize: 16,
          color: color.primary,
        }}
      >
        {nameOfPost}
      </Text>
      <PostBar />
    </View>
  );
};

export default Post;
