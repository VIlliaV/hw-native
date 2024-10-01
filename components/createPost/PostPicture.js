import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { styles, color } from '../../style';
import PlugCamera from '../SVGComponents/PlugCamera';
import { CameraView } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { useIsFocused } from '@react-navigation/native';
import CustomImage from '../CustomImage';

const PostPicture = ({ setCreatePostData, photoUri }) => {
  const [cameraRef, setCameraRef] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const isFocused = useIsFocused();

  const takePicture = async () => {
    if (!photoUri) {
      if (cameraRef) {
        try {
          const { uri } = await cameraRef.takePictureAsync();
          setIsFetching(true);
          const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });
          const coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          setIsFetching(false);
          await MediaLibrary.createAssetAsync(uri);
          setCreatePostData(prev => ({ ...prev, photoUri: uri, coords }));
        } catch (error) {
          Toast.show({
            type: 'error',
            text1: 'Помилка',
            text2: `${error.code}`,
          });
          setIsFetching(false);
        }
      }
    } else {
      setCreatePostData(prev => ({ ...prev, photoUri: '', coords: {} }));
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
      {isFetching ? (
        <ActivityIndicator size="large" />
      ) : photoUri || !isFocused ? (
        <CustomImage
          source={photoUri}
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
