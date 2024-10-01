import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../config';
import Toast from 'react-native-toast-message';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

const uriToBlob = async uri => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

export const uploadImageToFirebase = async ({ fileUri, width, height }) => {
  try {
    const size = [];
    if (width || height) {
      size[0] = { resize: {} };
    }
    if (width) {
      size[0].resize.width = width;
    }
    if (height) {
      size[0].resize.height = height;
    }

    const compressedImage = await manipulateAsync(fileUri, size, {
      compress: 0.8,
      format: SaveFormat.WEBP,
    });
    const blob = await uriToBlob(compressedImage.uri);
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
      await setDoc(ref, { ...data, timestamp: serverTimestamp() });
    } else {
      const ref = collection(db, collectionName);
      const postRef = await addDoc(ref, { ...data, timestamp: serverTimestamp() });
      const postSnap = await getDoc(postRef);
      const timestamp = postSnap.data().timestamp.toMillis();
      return { id: postRef.id, timestamp };
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

export const updateArrDataInFirestore = async ({
  collectionName,
  docId,
  keyPost,
  data,
  isAdd = true,
  timestamp = false,
}) => {
  try {
    const ref = doc(db, collectionName, docId);
    if (isAdd) {
      timestamp ? (data.timestamp = Date.now()) : data;
      await updateDoc(ref, {
        [keyPost]: arrayUnion(data),
      });
    } else {
      await updateDoc(ref, {
        [keyPost]: arrayRemove(data),
      });
    }
  } catch (error) {
    throw error;
  }
};

export const getDataFromFirestore = async ({
  collectionName,
  sort = [],
  pageLimit = 3,
  lastVisible = null,
  queryDoc = [],
}) => {
  try {
    let constraints = [];
    if (queryDoc.length > 0) {
      constraints.push(where(...queryDoc));
    }
    if (sort.length > 0) {
      constraints.push(orderBy(...sort));
    }
    if (lastVisible) {
      const docRef = doc(db, collectionName, lastVisible);
      const docSnap = await getDoc(docRef);
      constraints.push(startAfter(docSnap));
    }
    if (pageLimit !== 0) {
      constraints.push(limit(pageLimit));
    }

    const q = query(collection(db, collectionName), ...constraints);

    const snapshot = await getDocs(q);
    const postData = snapshot.docs.map(doc => {
      const data = doc.data();
      data.timestamp = data.timestamp.toMillis();
      data.id = doc.id;
      return data;
    });

    return { postData };
  } catch (error) {
    throw error;
  }
};

export const getQueryDataFromFirestore = async (collectionName, key, value) => {
  const q = query(collection(db, collectionName), where(key, '==', value));

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    data.timestamp = data.timestamp.toMillis();
    data.id = doc.id;
    return data;
  });
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
