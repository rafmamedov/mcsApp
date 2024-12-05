import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../config';
import { setUserInfo, clearUserInfo } from '../redux/reducers/userSlice';
import { addUser, getUser } from './firestore';

// Функція для реєстрації користувача
export const registerDB = async ({ email, password, login }) => {
  try {
    const credentials = await createUserWithEmailAndPassword(auth, email, password);
    const user = credentials.user;

    await addUser(user.uid, {
      uid: user.uid, email: user.email || '',
      displayName: login || '',
    })
  } catch (error) {
    console.log('Signup error:', error)
  };
};

// Функція для логіну користувача та збереження його в Redux
export const loginDB = async ({ email, password }, dispatch) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    console.log(credentials)
    const user = credentials.user;

    dispatch(setUserInfo({
      uid: user.uid,
      email: user?.email || '',
      displayName: user?.displayName || '',
      profilePhoto: user?.photoURL || "",
    }));
    return user;
  } catch (error) {
    console.log(error)
  }
};

  // Функція для логауту
export const logoutDB = async (dispatch) => {
  try {
    await signOut(auth);
    // Очистити інформацію про користувача у Redux
    dispatch(clearUserInfo());
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Відстеження змін у стані аутентифікації
export const authStateChanged = (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userData = await getUser(user.uid)

      dispatch(setUserInfo({
        ...userData,
        uid: user.uid,
        email: user.email || '',
      }));
    } else {
      dispatch(clearUserInfo());
    }
  });
};

// Оновлення профілю користувача
export const updateUserProfile = async (update) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await updateProfile(user, update);
    } catch (error) {
      throw error;
    }
  }
};
