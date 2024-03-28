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

  const [isPasswordHide, setIsPasswordHide] = useState(false);

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const onPress = () => {
    console.log(auth);
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
                onSubmitEditing={keyboardHide}
                style={{ ...styles.textInput }}
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
              //? для того щоб не мерегтіло на IOS поле емаіл
              onFocus={() => setIsPasswordHide(true)}
              onBlur={() => auth.password === "" && setIsPasswordHide(false)}
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
              {!isLogin ? "Зареєструватися" : "Увійти"}
            </Text>
          </TouchableOpacity>
          <View style={{ marginBottom: 78, flexDirection: "row" }}>
            <Text style={{ ...styles.text, color: color.secondary }}>
              {!isLogin ? "Вже є акаунт? " : "Немає акаунту? "}
            </Text>
            <Text
              onPress={onPress}
              style={{
                ...styles.text,
                color: color.secondary,
                textDecorationLine: "underline",
              }}
            >
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
