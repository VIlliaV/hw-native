import { Image, View } from "react-native";
import { styles } from "../../style/styles";
import PlugCamera from "../SVGComponents/PlugCamera";
import { color } from "../../style/color";

const PostPicture = ({ isPhotoAdd }) => {
  return (
    <View
      style={{
        position: "relative",
        marginBottom: 8,
        overflow: "hidden",
      }}
    >
      <Image
        // source={}
        resizeMode="cover"
        style={{
          ...styles.image,
          borderWidth: 1,
          borderColor: color.border,
          backgroundColor: color.bg_secondary,
        }}
      />
      <View
        style={{
          ...styles.positionCenter({ width: 60, height: 60 }),
          borderRadius: 50,
          backgroundColor: isPhotoAdd ? "rgba(255, 255, 255, 0.3)" : color.bg,
        }}
      >
        <View
          style={{
            ...styles.positionCenter({ width: 24, height: 24 }),
          }}
        >
          <PlugCamera active={isPhotoAdd} />
        </View>
      </View>
    </View>
  );
};

export default PostPicture;
