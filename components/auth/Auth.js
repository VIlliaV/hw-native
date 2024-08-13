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
} from "react-native";

import { styles } from "../../style/styles";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { color } from "../../style/color";
import back_ground from "../../assets/image/Photo BG.webp";
import back_ground_2x from "../../assets/image/Photo BGx2.webp";
import ProfileBox from "../ProfileBox";

const initialLogin = {
  email: "",
  password: "",
};

const initialReg = {
  login: "",
  email: "",
  password: "",
};

const AuthComp = ({ route }) => {
  const [auth, setAuth] = useState(
    route.name === "Login" ? initialLogin : initialReg
  );
  const [inputOnFocus, setInputOnFocus] = useState({});
  const [isPasswordHide, setIsPasswordHide] = useState(false);

  const navigation = useNavigation();

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const handleAuth = () => {
    route.name === "Login"
      ? navigation.navigate("Registration")
      : navigation.navigate("Login");
  };

  const onSubmit = () => {
    // if (route.name === "Login") {
    //   const { email } = auth;
    // } else {
    //   const { email, login } = auth;
    // }
    navigation.navigate("Home");
  };

  const onBlur = (e) => {
    const { placeholder } = e._dispatchInstances.memoizedProps;
    setInputOnFocus((prev) => ({ ...prev, [placeholder]: false }));
  };

  const onFocus = (e) => {
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
          style={styles.popUp}
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
        >
          <ProfileBox route={route}>
            {route.name !== "Login" && (
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
          </ProfileBox>
        </KeyboardAvoidingView>
        <View style={styleAuth.submitBox}>
          <TouchableOpacity
            onPress={onSubmit}
            activeOpacity={0.6}
            style={styles.button}
          >
            <Text style={{ ...styles.text, color: color.bg }}>
              {route.name !== "Login" ? "Зареєструватися" : "Увійти"}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              marginBottom: route.name !== "Login" ? 78 : 144,
              flexDirection: "row",
            }}
          >
            <Text style={{ ...styles.text, color: color.secondary }}>
              {route.name !== "Login" ? "Вже є акаунт? " : "Немає акаунту? "}
            </Text>
            <Text onPress={handleAuth} style={styleAuth.changeAuth}>
              {route.name !== "Login" ? "Увійти" : "Зареєструватися"}
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
