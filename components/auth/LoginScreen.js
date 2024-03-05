import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput } from "react-native";
import { styles } from "../../style/styles";

const LoginScreen = () => {
  const [text, setText] = useState("");
  return (
    <View>
      <Text style={styles.text}>Hello KeT</Text>
      <Text style={styles.title}>Hello KeT</Text>
      <Text style={{ fontFamily: "Roboto-Bold" }}>Hello </Text>
      <Text style={{ fontFamily: "Inter-Medium" }}>Hello KeT</Text>
      <Text style={{ fontFamily: "Inter-Medium" }}>Hello KeT</Text>
      <Text style={{ fontFamily: "Inter-Medium" }}>Hello KeT</Text>
      <Text style={{ fontFamily: "Inter-Medium" }}>Hello KeT</Text>
      <Text style={{ fontFamily: "Inter-Medium" }}>Hello KeT</Text>
      <Text style={{ fontFamily: "Inter-Medium" }}>Hello KeT</Text>
      <Text style={{ fontFamily: "Inter-Medium" }}>Hello KeT</Text>
      <KeyboardAvoidingView // визначаємо ОС та налаштовуємо поведінку клавіатури
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TextInput
          placeholder="Type text"
          value={text}
          onChangeText={setText}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
