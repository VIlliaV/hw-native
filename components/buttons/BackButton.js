import { useNavigation } from '@react-navigation/native';
import BackSVG from '../SVGComponents/BackSVG';
import { TouchableOpacity } from 'react-native';

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={{ paddingHorizontal: 16 }} activeOpacity={0.6} onPress={() => navigation.goBack()}>
      <BackSVG />
    </TouchableOpacity>
  );
};

export default BackButton;
