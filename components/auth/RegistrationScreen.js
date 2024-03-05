import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { styles } from "../../style/styles";
import { useState } from "react";

const RegistrationScreen = () => {
  const [text, setText] = useState("");
  return (
    <KeyboardAvoidingView // визначаємо ОС та налаштовуємо поведінку клавіатури
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      style={styles.popUp}
    >
      <Text style={styles.title}>Реєстрація</Text>
      <Text style={styles.text}>Hello KeT</Text>
      <Text style={{ fontFamily: "Roboto-Bold" }}>Hello </Text>
      <Text style={{ fontFamily: "Inter-Medium" }}>Hello KeT</Text>
      <Text style={{ fontFamily: "Inter-Medium" }}>Hello KeT</Text>
      <Text style={{ fontFamily: "Inter-Medium" }}>Hello KeT</Text>
      <Text style={{ fontFamily: "Inter-Medium" }}>Hello KeT</Text>

      <TextInput
        placeholder="Type text HERE"
        value={text}
        onChangeText={setText}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Type text HERE"
        // value={text}
        // onChangeText={setText}
        style={styles.textInput}
      />
    </KeyboardAvoidingView>

    // <View style={styles.popUp}>

    //   <Text style={{ fontFamily: "Inter-Medium" }}>Hello KeT</Text>
    //   <Text style={{ fontFamily: "Inter-Medium" }}>TEST</Text>
    // </View>
  );
};

export default RegistrationScreen;
