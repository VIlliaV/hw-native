import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import RegistrationScreen from '../screens/authScreens/RegistrationScreen';
import LoginScreen from '../screens/authScreens/LoginScreen';

import Nested from './Nested';
import Home from './Home';
import { useAuth } from '../utils/hooks/useAuth';
import Toast from 'react-native-toast-message';
import { usePosts } from '../utils/hooks/usePosts';
import { useDispatch } from 'react-redux';
// import { fetchPosts } from '../redux/posts/postOperations';
import { collection, onSnapshot } from 'firebase/firestore';
import { fetchPosts } from '../redux/posts/postSlice';
import { db } from '../config';

const RootRouter = () => {
  const MainStack = createStackNavigator();
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts'), snapshot => {
      const postsData = snapshot.docs.map(doc => {
        const data = doc.data();
        // console.log('🚀 ~ data:', data);
        data.createdAt = data.createdAt?.toMillis() || Date.now();
        data.id = doc.id;
        return data;
      });
      dispatch(fetchPosts(postsData));
    });
    return () => unsubscribe();
  }, []);

  const { userError } = useAuth();
  const { postsError } = usePosts();

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
        <MainStack.Navigator initialRouteName="Registration">
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
