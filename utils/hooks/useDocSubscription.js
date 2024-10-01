import { useEffect, useState } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../config';
import { useDispatch } from 'react-redux';
import { actUpdatePost } from '../../redux/posts/postSlice';
import Toast from 'react-native-toast-message';

export const useDocSubscription = (collectionName, id, inView = true) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribe;

    if (inView) {
      unsubscribe = onSnapshot(
        doc(db, collectionName, id),
        doc => {
          const data = doc.data();
          data.timestamp = data?.timestamp.toMillis() || Date.now();

          dispatch(actUpdatePost({ idPost: id, update: data }));
        },
        error => {
          Toast.show({
            type: 'error',
            text1: 'Помилка',
            text2: `${error.code || error.message}`,
          });
        }
      );
      setIsSubscribed(true);
    } else {
      if (unsubscribe) {
        unsubscribe();
        setIsSubscribed(false);
      }
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [inView]);

  return isSubscribed;
};
