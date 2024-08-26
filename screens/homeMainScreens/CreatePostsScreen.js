import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import HeadContainer from "../../components/HeadContainer";
import { styles } from "../../style/styles";
import { color } from "../../style/color";
import PlugCamera from "../../components/SVGComponents/PlugCamera";
import { useRef, useState } from "react";
import LocationSVG from "../../components/SVGComponents/LocationSVG";
import { useNavigation } from "@react-navigation/native";
import TrashSVG from "../../components/SVGComponents/TrashSVG";

const initial = {
  name: "",
  location: "",
  photo: "",
};

const CreatePostsScreen = () => {
  const [createPostData, setCreatePostData] = useState(initial);
  const [inputOnFocus, setInputOnFocus] = useState({});

  const navigation = useNavigation();

  const isPhotoAdd = false;

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    isPhotoAdd && navigation.navigate("PostsScreen");
  };

  const secondInputRef = useRef(null);

  return (
    <HeadContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <KeyboardAvoidingView
            style={{ flex: 1, marginBottom: 100 }}
            behavior={Platform.OS === "ios" ? "position" : "position"}
          >
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
                  backgroundColor: isPhotoAdd
                    ? "rgba(255, 255, 255, 0.3)"
                    : color.bg,
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
            <Text
              style={{
                ...styles.text,
                color: color.placeholder,
                marginBottom: 32,
                lineHeight: 19,
              }}
            >
              {isPhotoAdd ? "Редагувати фото" : "Завантажте фото"}
            </Text>

            <View>
              <TextInput
                {...inputNameProps}
                value={createPostData.name}
                onChangeText={(value) =>
                  setCreatePostData((prev) => ({ ...prev, name: value }))
                }
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
                  value={createPostData.location}
                  onChangeText={(value) =>
                    setCreatePostData((prev) => ({ ...prev, location: value }))
                  }
                  onFocus={() =>
                    setInputOnFocus(inputLocationProps.placeholder)
                  }
                  onBlur={() => setInputOnFocus(null)}
                  onSubmitEditing={keyboardHide}
                  style={{
                    ...stylesPost.inputPost({
                      inputOnFocus,
                      type: inputLocationProps.placeholder,
                    }),
                    fontFamily: "Roboto-Regular",
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
              position: "absolute",
              top: 447,
              backgroundColor: isPhotoAdd ? color.accent : color.bg_secondary,
            }}
          >
            <Text
              style={{
                ...styles.text,
                color: isPhotoAdd ? color.bg : color.placeholder,
              }}
            >
              Опублікувати
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCreatePostData(initial);
            }}
            activeOpacity={0.6}
            style={{
              ...stylesPost.trashButton,
              backgroundColor: isPhotoAdd ? color.accent : color.bg_secondary,
            }}
          >
            <View style={styles.positionCenter({ width: 24, height: 24 })}>
              <TrashSVG active={isPhotoAdd} />
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
    fontFamily: "Roboto-Medium",
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
    position: "relative",
    transformOrigin: "top",
    // marginBottom: 32,
  },

  locationSvg: {
    position: "absolute",
    flex: 1,
    top: "50%",
    transform: [{ translateY: -12 }],
  },

  trashButton: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: [{ translateX: -35 }],
    width: 70,
    height: 40,
    borderRadius: 20,
    marginBottom: 34,
    alignItems: "center",
  },
};

const inputNameProps = {
  placeholder: "Назва...",
  placeholderTextColor: color.placeholder,
};

const inputLocationProps = {
  placeholder: "Місцевість...",
  placeholderTextColor: color.placeholder,
};
