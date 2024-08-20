import React from "react";
import CommentsScreen from "../screens/nestedScreens/CommentsScreen";
import MapScreen from "../screens/nestedScreens/MapScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Nested = () => {
  const NestedStack = createStackNavigator();
  return (
    <NestedStack.Navigator backBehavior="none">
      <NestedStack.Screen
        name="MapScreen"
        component={MapScreen}
        // options={{
        //   headerShown: false,
        // }}
      />
      <NestedStack.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
        }}
      />
    </NestedStack.Navigator>
  );
};

export default Nested;
