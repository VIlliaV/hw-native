import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config';
import Toast from 'react-native-toast-message';

const uriToBlob = async uri => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

export const uploadImageToFirebase = async fileUri => {
  try {
    const blob = await uriToBlob(fileUri);
    const storageRef = ref(storage, `images/${Date.now()}`);
    const snapshot = await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Помилка завантаження файлу, спробуйте ще раз',
      text2: `${error.message}`,
    });
  }
};
