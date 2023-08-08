import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBdsG13ukqgZWsMk_bMU4qmEPVZ7lM-IbY",
  authDomain: "qoodz-api.firebaseapp.com",
  projectId: "qoodz-api",
  storageBucket: "qoodz-api.appspot.com",
  messagingSenderId: "1081992846745",
  appId: "1:1081992846745:web:37f07d1eda21ef4e82c708",
  measurementId: "G-LTEMT0ZZCW",
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
