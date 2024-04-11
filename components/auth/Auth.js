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
import { useEffect, useState } from "react";
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

const initialFocus = {
  login: false,
  email: false,
  password: false,
};

const AuthComp = ({ isLogin }) => {
  const [auth, setAuth] = useState(isLogin ? initialLogin : initialReg);
  const [inputOnFocus, setInputOnFocus] = useState(initialFocus);

  const [isPasswordHide, setIsPasswordHide] = useState(false);

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const onPress = () => {
    // console.log(auth);
    alert("так сильно не тисни))");
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
            <View style={styleAuth.avatarBox}>
              <AddSVG fill={color.accent} bg={color.bg} />
              <DeleteSVG
                fill={color.placeholder}
                bg={color.bg}
                border={color.border}
              />
            </View>
            <Text style={styleAuth.titleAuth(isLogin)}>
              {!isLogin ? "Реєстрація" : "Увійти"}
            </Text>
            {!isLogin && (
              <TextInput
                placeholder="Логін"
                placeholderTextColor={color.placeholder}
                autoCapitalize="none"
                autoComplete={
                  Platform.OS === "ios" ? "nickname" : "username-new"
                }
                textContentType="nickname"
                clearButtonMode="always"
                value={auth.login}
                onChangeText={(value) =>
                  setAuth((prev) => ({ ...prev, login: value }))
                }
                onFocus={() =>
                  setInputOnFocus((prev) => ({ ...prev, login: true }))
                }
                onBlur={() =>
                  setInputOnFocus((prev) => ({ ...prev, login: false }))
                }
                onSubmitEditing={keyboardHide}
                style={styleAuth.inputAuth({ inputOnFocus, type: "login" })}
              />
            )}
            <TextInput
              placeholder="Адреса електронної пошти"
              placeholderTextColor={color.placeholder}
              autoComplete="email"
              inputMode="email"
              clearButtonMode="always"
              value={auth.email}
              onChangeText={(value) =>
                setAuth((prev) => ({ ...prev, email: value }))
              }
              onFocus={() =>
                setInputOnFocus((prev) => ({ ...prev, email: true }))
              }
              onBlur={() =>
                setInputOnFocus((prev) => ({ ...prev, email: false }))
              }
              onSubmitEditing={keyboardHide}
              style={styleAuth.inputAuth({ inputOnFocus, type: "email" })}
            />
            <View style={styleAuth.passwordBox}>
              <TextInput
                placeholder="Пароль"
                placeholderTextColor={color.placeholder}
                autoComplete="new-password"
                secureTextEntry={isPasswordHide}
                clearButtonMode="always"
                value={auth.password}
                onChangeText={(value) =>
                  setAuth((prev) => ({ ...prev, password: value }))
                }
                //? для того щоб не мерегтіло на IOS поле емаіл
                onFocus={() => {
                  setIsPasswordHide(true);
                  setInputOnFocus((prev) => ({ ...prev, password: true }));
                }}
                onBlur={() => {
                  auth.password === "" && setIsPasswordHide(false);
                  setInputOnFocus((prev) => ({ ...prev, password: false }));
                }}
                onSubmitEditing={keyboardHide}
                style={{
                  ...styleAuth.inputAuth({ inputOnFocus, type: "password" }),
                  marginBottom: 43,
                }}
              />
              <TouchableOpacity style={styleAuth.showPassword}>
                <Text
                  onPress={onPress}
                  style={{ ...styles.text, color: color.secondary }}
                >
                  Показати
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
        <View style={styleAuth.submitBox}>
          <TouchableOpacity onPress={onPress} style={styles.button}>
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
