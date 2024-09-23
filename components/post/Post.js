import { Image, Text, View } from 'react-native';
import { styles } from '../../style/styles';
import PostBar from './PostBar';
import { color } from '../../style/color';
import noPhoto from '../../assets/image/noPhoto.png';
import { InView } from 'react-native-intersection-observer';
// import { useFirestoreSubscription } from '../../hooks/useFirestoreSubscription'; // підключаємо хук
import { db } from '../../config';
import { useDocSubscription } from '../../utils/hooks/useDocSubscription';
import { useState } from 'react';

const Post = ({ item, showCity }) => {
  const { name, urlPhoto, id, inView } = item;

  useDocSubscription('posts', id, inView);

  // const onViewChange = inView => {
  //   setInView(inView);
  // };

  return (
    <View
      // onChange={onViewChange}
      style={{ gap: 8, paddingBottom: 32 }}
    >
      <View style={{ height: 240 }}>
        <Image
          source={urlPhoto ? { uri: urlPhoto } : noPhoto}
          resizeMode="cover"
          style={{
            ...styles.image,
          }}
        />
      </View>
      <Text
        style={{
          fontFamily: 'Roboto-Medium',
          fontSize: 16,
          color: color.primary,
        }}
      >
        {name}
      </Text>
      <PostBar props={item} showCity={showCity} />
    </View>
  );
};

export default Post;
