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
        behavior={Platform.OS === "ios" ? "position" : "height"}
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
          <TextInput
            ref={secondInputRef}
            {...inputNameProps}
            value={createPostData.name}
            onChangeText={(value) =>
              setCreatePostData((prev) => ({ ...prev, name: value }))
            }
            onFocus={() => setInputOnFocus(inputNameProps.placeholder)}
            onBlur={() => setInputOnFocus(null)}
            onSubmitEditing={keyboardHide}
            style={stylesPost.inputPost({
              inputOnFocus,
              type: inputNameProps.placeholder,
            })}
          />
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
  }),
};

const inputNameProps = {
  placeholder: "Назва...",
  placeholderTextColor: { ...color.placeholder },
};
