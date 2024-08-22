import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import HeadContainer from "../../components/HeadContainer";
import { styles } from "../../style/styles";
import { color } from "../../style/color";
import PlugCamera from "../../components/SVGComponents/PlugCamera";
import { useRef, useState } from "react";
import LocationSVG from "../../components/SVGComponents/LocationSVG";

const initial = {
  name: "",
  location: "",
  photo: "",
};

const CreatePostsScreen = () => {
  const [createPostData, setCreatePostData] = useState(initial);
  const [inputOnFocus, setInputOnFocus] = useState({});
  const isPhotoAdd = true;

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const secondInputRef = useRef(null);

  return (
    <HeadContainer>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "position" : "position"}
      >
        <View
          style={{
            position: "relative",
            width: "100%",
            height: 240,
            marginBottom: 8,
          }}
        >
          <Image
            // source={}
            resizeMode="cover"
            style={{
              ...styles.image,
              borderRadius: 8,
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
          <View style={{ ...stylesPost.locationBox, marginBottom: 16 }}>
            <TextInput
              ref={secondInputRef}
              {...inputLocationProps}
              value={createPostData.location}
              onChangeText={(value) =>
                setCreatePostData((prev) => ({ ...prev, location: value }))
              }
              onFocus={() => setInputOnFocus(inputLocationProps.placeholder)}
              onBlur={() => setInputOnFocus(null)}
              onSubmitEditing={keyboardHide}
              style={stylesPost.inputPost({
                inputOnFocus,
                type: inputLocationProps.placeholder,
              })}
            />
            <View style={stylesPost.locationSvg}>
              <LocationSVG />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* <Text
        style={{
          position: "absolute",

          bottom: 0,
          left: "50%",

          zIndex: 100,
        }}
      >
        CreatePostsScreen!
      </Text> */}
    </HeadContainer>
  );
};

export default CreatePostsScreen;

const stylesPost = {
  inputPost: ({ inputOnFocus, type }) => ({
    ...styles.textInput,
    fontFamily: "Roboto-Medium",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
    borderColor: inputOnFocus !== type ? color.border : color.accent,
    backgroundColor: color.bg,
    marginBottom: 0,
  }),

  locationBox: {
    position: "relative",
    transformOrigin: "top",
  },

  locationSvg: {
    position: "absolute",
    flex: 1,
    top: "50%",
    transform: [{ translateY: -12 }],
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
