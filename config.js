// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from 'firebase/auth';
// Функція для підключення бази даних у проект
import { getFirestore } from 'firebase/firestore';
// Функція для підключення сховища файлів в проект
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  //   apiKey: "api-key",
  //   authDomain: "project-id.firebaseapp.com",

  // databaseURL: "<https://native-viv.firebaseio.com>",

  //   projectId: "project-id",
  //   storageBucket: "project-id.appspot.com",
  //   messagingSenderId: "sender-id",
  //   appId: "app-id",
  //   measurementId: "G-measurement-id",
  apiKey: 'AIzaSyA77j-BmjocvDvr93fFSa8qgLLZy8Ml9bU',
  authDomain: 'native-viv.firebaseapp.com',
  projectId: 'native-viv',
  storageBucket: 'native-viv.appspot.com',
  messagingSenderId: '685794446892',
  appId: '1:685794446892:web:11a3f15f86c0a2bbdfcb89',
  measurementId: 'G-1JQ388B23Q',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
