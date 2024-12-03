// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: '<YOUR API KEY>',
  authDomain: '<project-id>.firebaseapp.com',
  projectId: '<project-id>',
  storageBucket: 'gs://<project-id>.firebasestorage.app',
};

const app = initializeApp(firebaseConfig);

// Ініціалізація Auth з AsyncStorage для роботи редакс персистора
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
