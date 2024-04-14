import { StatusBar } from "expo-status-bar";
import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { styles } from "../../style/styles";
import { useState } from "react";
import { color } from "../../style/color";
import back_ground from "../../assets/image/Photo BG.webp";
import back_ground_2x from "../../assets/image/Photo BGx2.webp";
import AddSVG from "../SVGComponents/AddSVG";
import DeleteSVG from "../SVGComponents/DeleteSVG";

const initialLogin = {
  email: "",
  password: "",
};

const initialReg = {
  login: "",
  email: "",
  password: "",
};

const AuthComp = ({ isLogin }) => {
  const [auth, setAuth] = useState(isLogin ? initialLogin : initialReg);
  const [inputOnFocus, setInputOnFocus] = useState({});
  const [isAvatarAdd, setIsAvatarAdd] = useState(false);

  const [isPasswordHide, setIsPasswordHide] = useState(false);

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const onPress = () => {
    alert("так сильно не тисни))");
  };

  const onBlur = (e) => {
    const { placeholder } = e._dispatchInstances.memoizedProps;
    setInputOnFocus((prev) => ({ ...prev, [placeholder]: false }));
  };

  const onFocus = (e) => {
    // console.log(
    //   "🚀 ~ e:",
    //   e._dispatchInstances.memoizedProps.textContentType,
    //   e._dispatchInstances.memoizedProps.autoComplete,
    //   e._dispatchInstances.memoizedProps.placeholder
    // );
    const { placeholder } = e._dispatchInstances.memoizedProps;
    setInputOnFocus((prev) => ({ ...prev, [placeholder]: true }));
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground
        source={Platform.OS === "ios" ? back_ground_2x : back_ground}
        resizeMode="cover"
        style={{ ...styles.image, justifyContent: "flex-end" }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
          style={styles.popUp}
        >
          <View>
            {!isLogin && (
              <View style={styleAuth.avatarBox}>
                <View style={styleAuth.buttonAvatar(isAvatarAdd)}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setIsAvatarAdd(!isAvatarAdd)}
                  >
                    {!isAvatarAdd ? (
                      <AddSVG fill={color.accent} bg={color.bg} />
                    ) : (
                      <DeleteSVG
                        fill={color.placeholder}
                        bg={color.bg}
                        border={color.border}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <Text style={styleAuth.titleAuth(isLogin)}>
              {!isLogin ? "Реєстрація" : "Увійти"}
            </Text>
            {!isLogin && (
              <TextInput
                {...inputLoginProps}
                value={auth.login}
                onChangeText={(value) =>
                  setAuth((prev) => ({ ...prev, login: value }))
                }
                onFocus={(e) => onFocus(e)}
                onBlur={(e) => onBlur(e)}
                onSubmitEditing={keyboardHide}
                style={styleAuth.inputAuth({
                  inputOnFocus,
                  type: inputLoginProps.placeholder,
                })}
              />
            )}
            <TextInput
              {...inputEmailProps}
              value={auth.email}
              onChangeText={(value) =>
                setAuth((prev) => ({ ...prev, email: value }))
              }
              onFocus={(e) => onFocus(e)}
              onBlur={(e) => onBlur(e)}
              onSubmitEditing={keyboardHide}
              style={styleAuth.inputAuth({
                inputOnFocus,
                type: inputEmailProps.placeholder,
              })}
            />
            <View style={styleAuth.passwordBox}>
              <TextInput
                {...inputPasswordProps}
                secureTextEntry={isPasswordHide}
                value={auth.password}
                onChangeText={(value) =>
                  setAuth((prev) => ({ ...prev, password: value }))
                }
                onFocus={(e) => {
                  onFocus(e);
                  //? для того щоб не мерегтіло на IOS поле емаіл
                  setIsPasswordHide(true);
                }}
                onBlur={(e) => {
                  onBlur(e);
                  //? для того щоб не мерегтіло на IOS поле емаіл
                  auth.password === "" && setIsPasswordHide(false);
                }}
                onSubmitEditing={keyboardHide}
                style={{
                  ...styleAuth.inputAuth({
                    inputOnFocus,
                    type: inputPasswordProps.placeholder,
                  }),
                  marginBottom: 43,
                }}
              />
              <TouchableOpacity
                style={styleAuth.showPassword}
                activeOpacity={0.6}
              >
                <Text
                  onPress={() => setIsPasswordHide(!isPasswordHide)}
                  style={{ ...styles.text, color: color.secondary }}
                >
                  {isPasswordHide ? "Показати" : "Сховати"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
        <View style={styleAuth.submitBox}>
          <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.6}
            style={styles.button}
          >
            <Text style={{ ...styles.text, color: color.bg }}>
              {!isLogin ? "Зареєструватися" : "Увійти"}
            </Text>
          </TouchableOpacity>
          <View
            style={{ marginBottom: !isLogin ? 78 : 144, flexDirection: "row" }}
          >
            <Text style={{ ...styles.text, color: color.secondary }}>
              {!isLogin ? "Вже є акаунт? " : "Немає акаунту? "}
            </Text>
            <Text onPress={onPress} style={styleAuth.changeAuth}>
              {!isLogin ? "Увійти" : "Зареєструватися"}
            </Text>
          </View>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default AuthComp;

const styleAuth = {
  avatarBox: {
    backgroundColor: color.bg_secondary,
    position: "absolute",
    top: -60,
    left: "50%",
    width: 120,
    height: 120,
    borderRadius: 16,
    transform: [{ translateX: -60 }],
    zIndex: 1,
  },
  buttonAvatar: (isAvatarAdd) => ({
    position: "absolute",
    bottom: isAvatarAdd ? 8 : 14,
    right: isAvatarAdd ? -18 : -13,
  }),
  titleAuth: (isLogin) => ({
    ...styles.title,
    marginBottom: 32,
    marginTop: !isLogin ? 92 : 32,
  }),

  inputAuth: ({ inputOnFocus, type }) => ({
    ...styles.textInput,
    borderColor: !inputOnFocus[type] ? color.border : color.accent,
    backgroundColor: !inputOnFocus[type] ? color.bg_secondary : color.bg,
  }),
  passwordBox: {
    position: "relative",
    transformOrigin: "top",
  },
  showPassword: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  submitBox: {
    backgroundColor: color.bg,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  changeAuth: {
    ...styles.text,
    color: color.secondary,
    textDecorationLine: "underline",
  },
};

const inputLoginProps = {
  placeholder: "Логін",
  placeholderTextColor: { ...color.placeholder },
  autoCapitalize: "none",
  autoComplete: Platform.OS === "ios" ? "nickname" : "username-new",
  textContentType: "nickname",
  clearButtonMode: "always",
  contextMenuHidden: true,
};

const inputEmailProps = {
  placeholder: "Адреса електронної пошти",
  placeholderTextColor: { ...color.placeholder },
  autoComplete: "email",
  inputMode: "email",
  clearButtonMode: "always",
};

const inputPasswordProps = {
  placeholder: "Пароль",
  placeholderTextColor: { ...color.placeholder },
  autoComplete: "new-password",
  // clearButtonMode: "always",
};
