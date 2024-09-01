import { Image, TouchableOpacity, View } from "react-native";
import { styles } from "../../style/styles";
import PlugCamera from "../SVGComponents/PlugCamera";
import { color } from "../../style/color";

import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import Permission from "../notification/Permission";

const PostPicture = ({ isPhotoAdd }) => {
  const [statusCamera, cameraPermission] = useCameraPermissions();
  const [statusLibrary, libraryPermission] = MediaLibrary.usePermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [havePicture, setHavePicture] = useState(null);

  if (!statusCamera || !statusLibrary) {
    return <View />;
  }

  if (!statusCamera.granted) {
    return (
      <Permission
        text="камеру"
        permissionFunction={cameraPermission}
        status={statusCamera.status}
      />
    );
  }

  if (!statusLibrary.granted) {
    return (
      <Permission
        text="доступ до фотографій"
        permissionFunction={libraryPermission}
        status={statusLibrary.status}
      />
    );
  }

  return (
    <CameraView
      ref={setCameraRef}
      style={{
        position: "relative",
        marginBottom: 8,
        overflow: "hidden",
        minHeight: 240,
      }}
      facing={"back"}
      //   active={false}
    >
      {havePicture && (
        <Image
          source={{ uri: havePicture }}
          resizeMode="cover"
          style={{
            ...styles.image,
            borderWidth: 1,
            borderColor: color.border,
            backgroundColor: color.bg_secondary,
          }}
        />
      )}
      <TouchableOpacity
        onPress={async () => {
          if (cameraRef) {
            const { uri } = await cameraRef.takePictureAsync();
            setHavePicture(uri);
            await MediaLibrary.createAssetAsync(uri);
          }
        }}
        style={{
          ...styles.positionCenter({ width: 60, height: 60 }),
          borderRadius: 50,
          backgroundColor: havePicture ? "rgba(255, 255, 255, 0.3)" : color.bg,
        }}
      >
        <View
          style={{
            ...styles.positionCenter({ width: 24, height: 24 }),
          }}
        >
          <PlugCamera active={havePicture} />
        </View>
      </TouchableOpacity>
    </CameraView>
  );
};

export default PostPicture;
