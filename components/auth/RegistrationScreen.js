import { Text, TextInput, View } from "react-native";
import { styles } from "../../style/styles";
import { useState } from "react";
import KeyboardAvoidingViewComp from "../KeyboardAvoidingViewComp/KeyboardAvoidingViewComp";
import AuthComp from "./AuthComp";

const RegistrationScreen = () => {
  return <AuthComp auth="register" />;
};

export default RegistrationScreen;
