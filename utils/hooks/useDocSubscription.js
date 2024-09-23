import { useEffect, useState } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../config';
import { useDispatch } from 'react-redux';
import { updatePost } from '../../redux/posts/postOperations';
import { actUpdatePost } from '../../redux/posts/postSlice';

export const useDocSubscription = (collectionName, id, inView, delay = 3000) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // let timer;
    let unsubscribe;

    if (inView) {
      // timer = setTimeout(() => {
      unsubscribe = onSnapshot(doc(db, collectionName, id), doc => {
        const data = doc.data();
        data.timestamp = data.timestamp?.toMillis() || Date.now();
        dispatch(actUpdatePost({ idPost: id, update: data }));
      });
      setIsSubscribed(true);
      // }, delay);
    } else {
      // clearTimeout(timer);
      if (unsubscribe) {
        unsubscribe();
        setIsSubscribed(false);
        unsubscribe();
      }
    }

    return () => {
      // clearTimeout(timer);

      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [inView]);

  return isSubscribed;
};
