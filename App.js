import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import RootRouter from './routes/RootRouter';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import store from './redux/store';

import { ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <Provider store={store.store}>
      <PersistGate loading={<ActivityIndicator size="large" />} persistor={store.persistor}>
        <RootRouter />
        <Toast />
      </PersistGate>
    </Provider>
  );
}
