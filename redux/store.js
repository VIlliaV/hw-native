import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import rootReducer from "./rootReducer";
import { authReducer } from './auth/authSlice';

// const persistConfig = {
//   key: "root",
//   storage: AsyncStorage,
// };

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['token'],
};

const rootReducer = combineReducers({
  //   contacts: contactsReducer,
  //   filter: filterReducer,
  auth: persistReducer(authPersistConfig, authReducer),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export default { store, persistor };
