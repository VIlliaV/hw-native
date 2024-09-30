import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';

import RegistrationScreen from '../screens/authScreens/RegistrationScreen';
import LoginScreen from '../screens/authScreens/LoginScreen';
import Nested from './Nested';
import Home from './Home';

import { fetchPosts } from '../redux/posts/postOperations';
import { useAuth, usePosts } from '../utils';

const RootRouter = () => {
  const MainStack = createStackNavigator();
  const dispatch = useDispatch();
  const { userError } = useAuth();
  const { postsError } = usePosts();

  useEffect(() => {
    dispatch(fetchPosts({ collectionName: 'posts', sort: ['timestamp', 'desc'] }));
  }, []);

  useEffect(() => {
    if (userError || postsError)
      Toast.show({
        type: 'error',
        text1: 'Помилка',
        text2: `${userError || postsError}`,
      });
  }, [userError, postsError]);

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <MainStack.Navigator initialRouteName="Login">
          <MainStack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
          <MainStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <MainStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <MainStack.Screen name="Nested" component={Nested} options={{ headerShown: false }} />
        </MainStack.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default RootRouter;
