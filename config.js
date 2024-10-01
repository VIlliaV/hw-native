import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { getFirestore } from 'firebase/firestore';

import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // databaseURL: "<https://native-viv.firebaseio.com>",
  apiKey: 'AIzaSyA77j-BmjocvDvr93fFSa8qgLLZy8Ml9bU',
  authDomain: 'native-viv.firebaseapp.com',
  projectId: 'native-viv',
  storageBucket: 'native-viv.appspot.com',
  messagingSenderId: '685794446892',
  appId: '1:685794446892:web:11a3f15f86c0a2bbdfcb89',
  measurementId: 'G-1JQ388B23Q',
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);
