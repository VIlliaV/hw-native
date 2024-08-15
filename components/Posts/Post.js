import { View, Image } from "react-native";
import postPhoto from "../../assets/image/postPhoto.jpg";
import { styles } from "../../style/styles";

const Post = () => {
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
    </View>
  );
};

export default Post;
