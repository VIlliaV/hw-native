import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import RegistrationScreen from "../screens/authScreens/RegistrationScreen";
import LoginScreen from "../screens/authScreens/LoginScreen";

import Nested from "./Nested";
import Home from "./Home";

const RootRouter = () => {
  const MainStack = createStackNavigator();

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <MainStack.Navigator initialRouteName="Registration">
          <MainStack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Nested"
            component={Nested}
            options={{ headerShown: false }}
          />
        </MainStack.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default RootRouter;
