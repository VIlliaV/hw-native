import { View, Image, Text, FlatList } from "react-native";
import postPhoto from "../../assets/image/postPhoto.jpg";
import { styles } from "../../style/styles";
import PostBar from "./PostBar";
import { color } from "../../style/color";

const jsonData = require("../../base/posts.json");

const Post = () => {
  const { posts } = jsonData;

  const nameOfPost = "data.name";
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <View style={{ gap: 8, paddingBottom: 32 }}>
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
            {item.nameOfPost}
          </Text>
          <PostBar props={item} />
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default Post;
