import { useEffect, useState } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../config';

export const useDocSubscription = (collectionName, id, inView, delay = 3000) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    let timer;
    let unsubscribe;

    if (inView) {
      timer = setTimeout(() => {
        unsubscribe = onSnapshot(doc(db, collectionName, id), doc => {
          console.log('Current data: ', doc.data());
        });
        setIsSubscribed(true);
      }, delay);
    } else {
      clearTimeout(timer);
      if (unsubscribe) {
        unsubscribe();
        setIsSubscribed(false);
        unsubscribe();
      }
    }

    return () => {
      clearTimeout(timer);
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [inView]);

  return isSubscribed;
};
