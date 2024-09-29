import { TouchableOpacity } from 'react-native-gesture-handler';
import ExitSVG from '../SVGComponents/ExitSVG';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../../redux/auth/authOperations';

const ExitButton = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onPress = async () => {
    try {
      await dispatch(signOutUser()).unwrap();

      navigation.navigate('Login');
    } catch (error) {}
  };

  return (
    <TouchableOpacity style={{ paddingHorizontal: 16 }} activeOpacity={0.6} onPress={onPress}>
      <ExitSVG />
    </TouchableOpacity>
  );
};

export default ExitButton;
