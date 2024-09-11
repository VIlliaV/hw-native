import { View, TouchableOpacity, Text, Image } from 'react-native';
import { styles } from '../style/styles';
import { color } from '../style/color';
import AddSVG from './SVGComponents/AddSVG';
import DeleteSVG from './SVGComponents/DeleteSVG';
import { useEffect, useState } from 'react';
import avatarImage from '../assets/image/avatarImage.jpg';
import noPhoto from '../assets/image/noPhoto.jpg';
import ExitButton from './buttons/ExitButton';
import { useAuth } from '../utils/hooks/useAuth';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import { deleteImageFromFirebase, uploadImageToFirebase } from '../utils/firebase';

const ProfileBox = ({ route, children, style = {}, title, changeAvatar = () => {} }) => {
  const { user } = useAuth();
  const { photoURL, displayName } = user;
  const [isAvatarAdd, setIsAvatarAdd] = useState(photoURL || null);

  useEffect(() => {
    setIsAvatarAdd(photoURL || null);
  }, [photoURL]);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setIsAvatarAdd(result.assets[0].uri);
        const urlAvatar = await uploadImageToFirebase(result.assets[0].uri);
        if (route.name === 'ProfileScreen') {
          changeAvatar({ photoURL: urlAvatar });
        } else {
          changeAvatar(prev => ({ ...prev, photoURL: urlAvatar }));
        }
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Спробуйте інше зображення',
        text2: `${error.code}`,
      });
    }
  };

  const pickNoImage = async () => {
    await deleteImageFromFirebase(isAvatarAdd);
    setIsAvatarAdd(null);
    if (route.name === 'ProfileScreen') {
      changeAvatar({ photoURL: '' });
    } else {
      changeAvatar(prev => ({ ...prev, photoURL: '' }));
    }
  };

  return (
    <View style={{ ...styles.popUp, ...style }}>
      {route.name === 'ProfileScreen' && (
        <View style={styleProfileBox.exitButton}>
          <ExitButton />
        </View>
      )}
      {route.name !== 'Login' && (
        <View style={{ ...styleProfileBox.avatarBox }}>
          <Image
            source={isAvatarAdd ? { uri: isAvatarAdd } : noPhoto}
            resizeMode="cover"
            style={{
              ...styles.bg_image,
              borderRadius: 16,
            }}
          />

          <View style={styleProfileBox.buttonAvatar(isAvatarAdd)}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                isAvatarAdd ? pickNoImage() : pickImage();
              }}
            >
              {!isAvatarAdd ? (
                <AddSVG fill={color.accent} bg={color.bg} />
              ) : (
                <DeleteSVG fill={color.placeholder} bg={color.bg} border={color.border} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Text style={styleProfileBox.titleAuth(route.name)}>{title ? title : displayName}</Text>
      <>{children}</>
    </View>
  );
};

export default ProfileBox;

const styleProfileBox = {
  avatarBox: {
    backgroundColor: color.bg_secondary,
    position: 'absolute',
    top: -60,
    left: '50%',
    width: 120,
    height: 120,
    borderRadius: 16,
    transform: [{ translateX: -60 + 16 }],
    zIndex: 1,
  },
  buttonAvatar: isAvatarAdd => ({
    position: 'absolute',
    bottom: isAvatarAdd ? 8 : 14,
    right: isAvatarAdd ? -18 : -13,
  }),
  titleAuth: routeName => ({
    ...styles.title,
    marginBottom: 32,
    marginTop: routeName !== 'Login' ? 92 : 32,
  }),

  exitButton: {
    position: 'absolute',
    top: 22,
    right: 0,
  },
};
