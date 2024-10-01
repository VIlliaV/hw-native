import ExitSVG from '../SVGComponents/ExitSVG';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../../redux/auth/authOperations';
import { TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

const ExitButton = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onPress = async () => {
    try {
      await dispatch(signOutUser()).unwrap();

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Помилка',
        text2: `${error.code || error.message}`,
      });
    }
  };

  return (
    <TouchableOpacity style={{ paddingHorizontal: 16 }} activeOpacity={0.6} onPress={onPress}>
      <ExitSVG />
    </TouchableOpacity>
  );
};

export default ExitButton;
