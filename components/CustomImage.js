import { useState } from 'react';
import noPhoto from '../assets/image/noPhoto.png';
import { Image } from 'react-native';

const CustomImage = ({ source, style, ...props }) => {
  const [imageSource, setImageSource] = useState(source ? { uri: source } : noPhoto);

  return <Image source={imageSource} onError={() => setImageSource(noPhoto)} style={[style]} {...props} />;
};

export default CustomImage;
