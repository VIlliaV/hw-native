import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../utils/hooks/useAuth';
import { useNavigation, useRoute } from '@react-navigation/native';
import { color, styles } from '../../style';

const SubmitAuth = ({ onSubmit }) => {
  const { isLoadingUser } = useAuth();
  const { name } = useRoute();
  const navigation = useNavigation();

  const handleAuth = () => {
    name === 'Login' ? navigation.push('Registration') : navigation.push('Login');
  };

  return (
    <View style={styleAuth.submitBox}>
      <TouchableOpacity disabled={isLoadingUser} onPress={onSubmit} activeOpacity={0.6} style={styles.button}>
        {isLoadingUser ? (
          <ActivityIndicator size="small" />
        ) : (
          <Text style={{ ...styles.text, color: color.bg }}>{name !== 'Login' ? 'Зареєструватися' : 'Увійти'}</Text>
        )}
      </TouchableOpacity>
      <View
        style={{
          marginBottom: name !== 'Login' ? 78 : 144,
          flexDirection: 'row',
        }}
      >
        <Text style={{ ...styles.text, color: color.secondary }}>
          {name !== 'Login' ? 'Вже є акаунт? ' : 'Немає акаунту? '}
        </Text>
        <Text onPress={handleAuth} style={styleAuth.changeAuth}>
          {name !== 'Login' ? 'Увійти' : 'Зареєструватися'}
        </Text>
      </View>
    </View>
  );
};

export default SubmitAuth;

const styleAuth = {
  submitBox: {
    backgroundColor: color.bg,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  changeAuth: {
    ...styles.text,
    color: color.secondary,
    textDecorationLine: 'underline',
  },
};
