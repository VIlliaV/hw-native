import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../config';
import Toast from 'react-native-toast-message';
import { addDoc, collection, doc, getDoc, getDocs, setDoc, updateDoc, query, where } from 'firebase/firestore';

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
      const postRef = await addDoc(ref, data);
      return postRef.id;
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

export const getDataFromFirestore = async collectionName => {
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.map(doc => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });
  } catch (error) {
    throw error;
  }
};
export const getQueryDataFromFirestore = async (collectionName, key, value) => {
  const q = query(collection(db, collectionName), where(key, '==', value));

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    data.id = doc.id;
    return data;
  });

  // querySnapshot.forEach(doc => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, ' => ', doc.data());
  // });
};

export const getItemFromFirestore = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (!data) throw new Error('doc not found');
    return data;
  } catch (error) {
    throw error;
  }
};
