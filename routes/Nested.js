import React from 'react';
import CommentsScreen from '../screens/nestedScreens/CommentsScreen';
import MapScreen from '../screens/nestedScreens/MapScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { styles } from '../style/styles';
import BackButton from '../components/buttons/BackButton';

const Nested = () => {
  const NestedStack = createStackNavigator();
  return (
    <NestedStack.Navigator
      backBehavior="none"
      screenOptions={{
        headerStyle: {
          height: 88,
        },
        headerTitleStyle: styles.headerTitle,
        headerTitleAlign: 'center',
      }}
    >
      <NestedStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: 'Карта',
          headerLeft: () => <BackButton />,
        }}
      />
      <NestedStack.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          title: 'Коментарі',
          headerLeft: () => <BackButton />,
        }}
      />
    </NestedStack.Navigator>
  );
};

export default Nested;
