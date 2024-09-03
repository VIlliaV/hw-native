import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../config";
import Toast from "react-native-toast-message";

const useAuth = () => {
  const currentUser = auth.currentUser;
  const registerDB = async ({ email, password }) => {
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      return credentials.user;
    } catch (error) {
      error.text1 = "Помилка реєстрації";
      throw error;
    }
  };

  const loginDB = async ({ email, password }) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return credentials.user;
    } catch (error) {
      error.text1 = "Помилка входу";
      throw error;
    }
  };

  const updateUserProfile = async (update) => {
    const user = auth.currentUser;
    if (user) {
      try {
        await updateProfile(user, update);
      } catch (error) {
        error.text1 = "Помилка нових даних";
        throw error;
      }
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      error.text1 = "Помилка виходу";
      throw error;
    }
  };

  return {
    currentUser,
    registerDB,
    loginDB,
    updateUserProfile,
    signOutUser,
  };
};

export default useAuth;
