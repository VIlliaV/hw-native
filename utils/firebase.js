import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../config';
import Toast from 'react-native-toast-message';
import { addDoc, collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';

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

export const deleteImageFromFirebase = async fileUri => {
  try {
    const storageRef = ref(storage, fileUri);
    await deleteObject(storageRef);
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Помилка видалення файлу, спробуйте ще раз',
      text2: `${error.message}`,
    });
  }
};

export const writeDataToFirestore = async (collectionName, docID, data) => {
  try {
    if (docID) {
      const ref = doc(db, collectionName, docID);
      await setDoc(ref, data);
    } else {
      const ref = collection(db, collectionName);
      await addDoc(ref, data);
    }
  } catch (error) {
    throw error;
  }
};

export const updateDataInFirestore = async (collectionName, docId, data) => {
  try {
    const ref = doc(db, collectionName, docId);
    await updateDoc(ref, data);
  } catch (error) {
    throw error;
  }
};

export const getDataFromFirestore = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'posts'));
    return snapshot.docs.map(doc => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });
  } catch (error) {
    throw error;
  }
};
