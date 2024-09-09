import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import HeadContainer from '../../components/HeadContainer';
import { styles } from '../../style/styles';
import { color } from '../../style/color';
import { useRef, useState } from 'react';
import LocationSVG from '../../components/SVGComponents/LocationSVG';
import { useNavigation } from '@react-navigation/native';
import TrashSVG from '../../components/SVGComponents/TrashSVG';
import PostPicture from '../../components/createPost/PostPicture';

import { useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import Permission from '../../components/notification/Permission';
import { uploadImageToFirebase } from '../../utils/firebase';

const initial = {
  name: '',
  description: '',
  photoUri: '',
};

const CreatePostsScreen = () => {
  const [statusCamera, cameraPermission] = useCameraPermissions();
  const [statusLibrary, libraryPermission] = MediaLibrary.usePermissions();
  const [statusLocation, requestPermission] = Location.useForegroundPermissions();
  const [createPostData, setCreatePostData] = useState(initial);
  const [isFetching, setIsFetching] = useState(false);
  const [inputOnFocus, setInputOnFocus] = useState({});

  const navigation = useNavigation();

  const { photoUri } = createPostData;

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const onSubmit = async () => {
    setIsFetching(true);
    const location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    await uploadImageToFirebase(photoUri);
    setIsFetching(false);
    setCreatePostData(initial);
    photoUri && navigation.navigate('PostsScreen');
  };

  const secondInputRef = useRef(null);

  if (!statusCamera || !statusLibrary || !statusLocation) {
    return <View />;
  }

  if (!statusCamera.granted) {
    return <Permission text="камеру" permissionFunction={cameraPermission} status={statusCamera.status} />;
  }

  if (!statusLibrary.granted) {
    return (
      <Permission text="доступ до фотографій" permissionFunction={libraryPermission} status={statusLibrary.status} />
    );
  }

  if (!statusLocation.granted) {
    if (statusLocation.status === 'undetermined') {
      requestPermission();
    } else {
      return (
        <Permission
          text="локацію"
          // permissionFunction={requestPermission}
          status={statusLocation.status}
        />
      );
    }
  }
  if (isFetching) return <Text style={styles.text}>Чекайте...</Text>;
  return (
    <HeadContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <KeyboardAvoidingView
            style={{ flex: 1, marginBottom: 100 }}
            behavior={Platform.OS === 'ios' ? 'position' : 'position'}
          >
            <PostPicture setCreatePostData={setCreatePostData} photoUri={photoUri} />
            <Text
              style={{
                ...styles.text,
                color: color.placeholder,
                marginBottom: 32,
                lineHeight: 19,
              }}
            >
              {photoUri ? 'Редагувати фото' : 'Завантажте фото'}
            </Text>

            <View>
              <TextInput
                {...inputNameProps}
                value={createPostData.name}
                onChangeText={value => setCreatePostData(prev => ({ ...prev, name: value }))}
                onFocus={() => setInputOnFocus(inputNameProps.placeholder)}
                onBlur={() => setInputOnFocus(null)}
                onSubmitEditing={() => {
                  keyboardHide;
                  secondInputRef.current?.focus();
                }}
                style={stylesPost.inputPost({
                  inputOnFocus,
                  type: inputNameProps.placeholder,
                })}
              />
              <View style={stylesPost.locationBox}>
                <TextInput
                  ref={secondInputRef}
                  {...inputLocationProps}
                  value={createPostData.description}
                  onChangeText={value =>
                    setCreatePostData(prev => ({
                      ...prev,
                      description: value,
                    }))
                  }
                  onFocus={() => setInputOnFocus(inputLocationProps.placeholder)}
                  onBlur={() => setInputOnFocus(null)}
                  onSubmitEditing={keyboardHide}
                  style={{
                    ...stylesPost.inputPost({
                      inputOnFocus,
                      type: inputLocationProps.placeholder,
                    }),
                    fontFamily: 'Roboto-Regular',
                    paddingLeft: 28,
                    marginBottom: 0,
                  }}
                />
                <View style={stylesPost.locationSvg}>
                  <LocationSVG />
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
          <TouchableOpacity
            onPress={onSubmit}
            activeOpacity={0.6}
            style={{
              ...styles.button,
              position: 'absolute',
              top: 447,
              backgroundColor: photoUri ? color.accent : color.bg_secondary,
            }}
          >
            <Text
              style={{
                ...styles.text,
                color: photoUri ? color.bg : color.placeholder,
              }}
            >
              Опублікувати
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCreatePostData(initial);
              // setIsPhotoAdd(false);
            }}
            activeOpacity={0.6}
            style={{
              ...stylesPost.trashButton,
              backgroundColor: photoUri ? color.accent : color.bg_secondary,
            }}
          >
            <View style={styles.positionCenter({ width: 24, height: 24 })}>
              <TrashSVG active={photoUri} />
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </HeadContainer>
  );
};

export default CreatePostsScreen;

const stylesPost = {
  inputPost: ({ inputOnFocus, type }) => ({
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    height: 50,
    color: color.primary,
    borderBottomWidth: 1,
    paddingVertical: 16,
    borderColor: inputOnFocus !== type ? color.border : color.accent,
    backgroundColor: color.bg,
    marginBottom: 16,
  }),

  locationBox: {
    position: 'relative',
    transformOrigin: 'top',
    // marginBottom: 32,
  },

  locationSvg: {
    position: 'absolute',
    flex: 1,
    top: '50%',
    transform: [{ translateY: -12 }],
  },

  trashButton: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: [{ translateX: -35 }],
    width: 70,
    height: 40,
    borderRadius: 20,
    marginBottom: 34,
    alignItems: 'center',
  },
};

const inputNameProps = {
  placeholder: 'Назва...',
  placeholderTextColor: color.placeholder,
};

const inputLocationProps = {
  placeholder: 'Місцевість...',
  placeholderTextColor: color.placeholder,
};
