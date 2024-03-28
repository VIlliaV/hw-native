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
import { useEffect, useState } from "react";
import { color } from "../../style/color";
import back_ground from "../../assets/image/Photo BG.webp";
import back_ground_2x from "../../assets/image/Photo BGx2.webp";

const initialAuth = {
  login: "",
  email: "",
  password: "",
};

const AuthComp = ({ isLogin }) => {
  const [auth, setAuth] = useState(initialAuth);
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const [isPasswordHide, setIsPasswordHide] = useState(false);

  useEffect(() => {
    // Keyboard.addListener("keyboardWillHide", () => {
    //   setIsKeyboardShow(false);
    // });
    //?  не треба
    // Keyboard.addListener("keyboardWillShow", () => {
    //   Keyboard.scheduleLayoutAnimation("keyboardWillShow");
    // });
    // return () => {
    //   hideSubscription.remove();
    // };
  }, []);

  const passwordOnFocus = () => {
    setIsKeyboardShow(true);
    setIsPasswordHide(true);
  };

  const keyboardHide = () => {
    setIsKeyboardShow(false);
    Keyboard.dismiss();
  };

  const onPress = () => {
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
            <Text style={styles.title}>
              Реєстрація{isKeyboardShow ? "true" : "false"}
            </Text>
            <TextInput
              placeholder="Логін"
              placeholderTextColor={color.placeholder}
              autoCapitalize="none"
              autoComplete={Platform.OS === "ios" ? "nickname" : "username-new"}
              textContentType="nickname"
              clearButtonMode="always"
              value={auth.login}
              onChangeText={(value) =>
                setAuth((prev) => ({ ...prev, login: value }))
              }
              onFocus={() => setIsKeyboardShow(true)}
              onSubmitEditing={keyboardHide}
              style={{ ...styles.textInput }}
            />
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
              onFocus={() => setIsKeyboardShow(true)}
              onSubmitEditing={keyboardHide}
              style={styles.textInput}
            />
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
              onFocus={passwordOnFocus}
              // onBlur={() => setIsPasswordHide(false)}
              onSubmitEditing={keyboardHide}
              style={{ ...styles.textInput, marginBottom: 43 }}
            />
          </View>
        </KeyboardAvoidingView>
        <View
          style={{
            backgroundColor: color.bg,
            paddingHorizontal: 16,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={onPress}
            style={{
              ...styles.button,
            }}
          >
            <Text style={{ ...styles.text, color: color.bg }}>
              Зареєстуватися
            </Text>
          </TouchableOpacity>
          <View style={{ marginBottom: 78, flexDirection: "row" }}>
            <Text style={{ ...styles.text, color: color.secondary }}>
              Вже є акаунт?{" "}
            </Text>
            <Text
              onPress={onPress}
              style={{
                ...styles.text,
                color: color.secondary,
                textDecorationLine: "underline",
              }}
            >
              Увійти
            </Text>
          </View>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default AuthComp;
