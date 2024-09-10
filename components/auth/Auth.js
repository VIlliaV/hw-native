import { StatusBar } from 'expo-status-bar';
import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import { styles } from '../../style/styles';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { color } from '../../style/color';
import back_ground from '../../assets/image/Photo BG.webp';
import back_ground_2x from '../../assets/image/Photo BGx2.webp';
import ProfileBox from '../ProfileBox';
import { useDispatch } from 'react-redux';
import { loginUser, registerUser, updateUserProfile } from '../../redux/auth/authOperations';
import { auth } from '../../config';
import { onAuthStateChanged } from 'firebase/auth';
// import { useAuth } from '../../utils/hooks/useAuth';
import { clearUser, setUser } from '../../redux/auth/authSlice';

const initialLogin = {
  email: '',
  password: '',
};

const initialReg = {
  displayName: '',
  email: '',
  password: '',
  photoURL: '',
};

const AuthComp = ({ route }) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        const userData = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        dispatch(setUser(userData));
        navigation.navigate('Home');
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const [authData, setAuthData] = useState(route.name === 'Login' ? initialLogin : initialReg);
  const dispatch = useDispatch();

  const [inputOnFocus, setInputOnFocus] = useState(null);
  const [isPasswordHide, setIsPasswordHide] = useState(false);

  const navigation = useNavigation();

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const autoCompletePassword =
    route.name === 'Login'
      ? Platform.OS === 'ios'
        ? 'current-password'
        : 'password'
      : Platform.OS === 'ios'
      ? 'new-password'
      : 'password-new';

  const handleAuth = () => {
    route.name === 'Login' ? navigation.push('Registration') : navigation.push('Login');
  };

  const onSubmit = async () => {
    try {
      if (route.name === 'Login') {
        await dispatch(loginUser(authData)).unwrap();
        setAuthData(initialLogin);
      } else {
        await dispatch(registerUser(authData)).unwrap();
        const { displayName, photoURL } = authData;
        await dispatch(updateUserProfile({ displayName, photoURL })).unwrap();
        setAuthData(initialReg);
      }
      // navigation.navigate('Home');
    } catch (error) {}
  };

  const title = route?.name !== 'Login' ? 'Реєстрація' : 'Увійти';

  // const onBlur = (e) => {
  //   const { placeholder } = e._dispatchInstances.memoizedProps;
  //   setInputOnFocus((prev) => ({ ...prev, [placeholder]: false }));
  // };

  // const onFocus = (e) => {
  //   const { placeholder } = e._dispatchInstances.memoizedProps;
  //   setInputOnFocus((prev) => ({ ...prev, [placeholder]: true }));
  // };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground
        source={Platform.OS === 'ios' ? back_ground_2x : back_ground}
        resizeMode="cover"
        style={{ ...styles.bg_image, justifyContent: 'flex-end' }}
      >
        <KeyboardAvoidingView
          style={{
            backgroundColor: color.bg,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        >
          <TouchableWithoutFeedback onPress={keyboardHide}>
            <View>
              <ProfileBox route={route} title={title} changeAvatar={setAuthData} authData={authData}>
                {route.name !== 'Login' && (
                  <TextInput
                    {...inputLoginProps}
                    value={authData.displayName}
                    onChangeText={value => setAuthData(prev => ({ ...prev, displayName: value }))}
                    onFocus={() => setInputOnFocus(inputLoginProps.placeholder)}
                    onBlur={() => setInputOnFocus(null)}
                    onSubmitEditing={keyboardHide}
                    style={styleAuth.inputAuth({
                      inputOnFocus,
                      type: inputLoginProps.placeholder,
                    })}
                  />
                )}
                <TextInput
                  {...inputEmailProps}
                  value={authData.email}
                  onChangeText={value => setAuthData(prev => ({ ...prev, email: value }))}
                  onFocus={() => setInputOnFocus(inputEmailProps.placeholder)}
                  onBlur={() => setInputOnFocus(null)}
                  onSubmitEditing={keyboardHide}
                  style={styleAuth.inputAuth({
                    inputOnFocus,
                    type: inputEmailProps.placeholder,
                  })}
                />
                <View style={styleAuth.passwordBox}>
                  <TextInput
                    {...inputPasswordProps}
                    autoComplete={autoCompletePassword}
                    secureTextEntry={isPasswordHide}
                    value={authData.password}
                    onChangeText={value => setAuthData(prev => ({ ...prev, password: value }))}
                    onFocus={() => {
                      setInputOnFocus(inputPasswordProps.placeholder);
                    }}
                    onBlur={() => {
                      setInputOnFocus(null);
                    }}
                    onSubmitEditing={keyboardHide}
                    style={{
                      ...styleAuth.inputAuth({
                        inputOnFocus,
                        type: inputPasswordProps.placeholder,
                      }),
                      marginBottom: 0,
                    }}
                  />
                  <TouchableOpacity style={styleAuth.showPassword} activeOpacity={0.6}>
                    <Text
                      onPress={() => setIsPasswordHide(!isPasswordHide)}
                      style={{ ...styles.text, color: color.secondary }}
                    >
                      {isPasswordHide ? 'Показати' : 'Сховати'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ProfileBox>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View style={styleAuth.submitBox}>
          <TouchableOpacity onPress={onSubmit} activeOpacity={0.6} style={styles.button}>
            <Text style={{ ...styles.text, color: color.bg }}>
              {route.name !== 'Login' ? 'Зареєструватися' : 'Увійти'}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              marginBottom: route.name !== 'Login' ? 78 : 144,
              flexDirection: 'row',
            }}
          >
            <Text style={{ ...styles.text, color: color.secondary }}>
              {route.name !== 'Login' ? 'Вже є акаунт? ' : 'Немає акаунту? '}
            </Text>
            <Text onPress={handleAuth} style={styleAuth.changeAuth}>
              {route.name !== 'Login' ? 'Увійти' : 'Зареєструватися'}
            </Text>
          </View>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default AuthComp;

const styleAuth = {
  inputAuth: ({ inputOnFocus, type }) => ({
    ...styles.textInput,
    borderColor: inputOnFocus !== type ? color.border : color.accent,
    backgroundColor: inputOnFocus !== type ? color.bg_secondary : color.bg,
  }),

  passwordBox: {
    position: 'relative',
    // transformOrigin: "top",
    marginBottom: 43,
  },
  showPassword: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
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

const inputLoginProps = {
  placeholder: 'Логін',
  placeholderTextColor: color.placeholder,
  autoCapitalize: 'none',
  autoComplete: Platform.OS === 'ios' ? 'nickname' : 'username-new',
  textContentType: 'nickname',
  clearButtonMode: 'always',
  contextMenuHidden: true,
};

const inputEmailProps = {
  placeholder: 'Адреса електронної пошти',
  placeholderTextColor: color.placeholder,
  autoComplete: 'email',
  inputMode: 'email',
  clearButtonMode: 'always',
};

const inputPasswordProps = {
  placeholder: 'Пароль',
  placeholderTextColor: color.placeholder,

  // clearButtonMode: "always",
};
