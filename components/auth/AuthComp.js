import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Button,
} from "react-native";
import { styles } from "../../style/styles";
import { useState } from "react";
import { color } from "../../style/color";

const AuthComp = ({ auth }) => {
  const [text, setText] = useState("");
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        style={styles.popUp}
      >
        <Text style={styles.title}>Реєстрація</Text>
        <Text style={styles.text}>Hello KeT</Text>

        <TextInput
          placeholder="Type text HERE"
          value={text}
          onChangeText={setText}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Type text HERE"
          value={text}
          onChangeText={setText}
          style={styles.textInput}
        />
      </KeyboardAvoidingView>
      <View
        style={{
          backgroundColor: color.bg,
          paddingHorizontal: 16,
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "Roboto-Bold" }}>Hello </Text>
        <Text style={{ fontFamily: "Inter-Medium" }}>Hello KeT</Text>

        <TouchableOpacity
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
            onPress={() => alert("Увійшли))")}
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
    </>
  );
};

export default AuthComp;
