import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../style/styles";
import PlugCamera from "../SVGComponents/PlugCamera";
import { color } from "../../style/color";

import { CameraView } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useState } from "react";
// import Permission from "../notification/Permission";

const PostPicture = ({ setIsPhotoAdd, isPhotoAdd }) => {
  const [cameraRef, setCameraRef] = useState(null);

  return (
    <View
      style={{
        position: "relative",
        marginBottom: 8,
        overflow: "hidden",
        minHeight: 240,
      }}
    >
      {isPhotoAdd ? (
        <Image
          source={{ uri: isPhotoAdd }}
          resizeMode="cover"
          style={{
            ...styles.image,
            borderWidth: 1,
            borderColor: color.border,
            backgroundColor: color.bg_secondary,
          }}
        />
      ) : (
        <CameraView
          ref={setCameraRef}
          facing={"back"}
          style={{
            minHeight: 240,
          }}
          //   active={false}
        ></CameraView>
      )}
      <TouchableOpacity
        onPress={async () => {
          if (!isPhotoAdd) {
            if (cameraRef) {
              const { uri } = await cameraRef.takePictureAsync();
              setIsPhotoAdd(uri);
              await MediaLibrary.createAssetAsync(uri);
            }
          } else {
            setIsPhotoAdd(false);
          }
        }}
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
      </TouchableOpacity>
    </View>
  );
};

export default PostPicture;
