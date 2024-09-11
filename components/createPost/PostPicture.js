import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../style/styles';
import PlugCamera from '../SVGComponents/PlugCamera';
import { color } from '../../style/color';

import { CameraView } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useState } from 'react';

const PostPicture = ({ setCreatePostData, photoUri }) => {
  const [cameraRef, setCameraRef] = useState(null);

  const takePicture = async () => {
    if (!photoUri) {
      if (cameraRef) {
        const { uri } = await cameraRef.takePictureAsync();
        setCreatePostData(prev => ({ ...prev, photoUri: uri }));
        await MediaLibrary.createAssetAsync(uri);
      }
    } else {
      setCreatePostData(prev => ({ ...prev, photoUri: '' }));
    }
  };

  return (
    <View
      style={{
        position: 'relative',
        marginBottom: 8,
        overflow: 'hidden',
        minHeight: 240,
      }}
    >
      {photoUri ? (
        <Image
          source={{ uri: photoUri }}
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
          facing={'back'}
          style={{
            minHeight: 240,
          }}
          //   active={false}
        ></CameraView>
      )}
      <TouchableOpacity
        onPress={() => {
          takePicture();
        }}
        style={{
          ...styles.positionCenter({ width: 60, height: 60 }),
          borderRadius: 50,
          backgroundColor: photoUri ? 'rgba(255, 255, 255, 0.3)' : color.bg,
        }}
      >
        <View
          style={{
            ...styles.positionCenter({ width: 24, height: 24 }),
          }}
        >
          <PlugCamera active={photoUri} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PostPicture;
