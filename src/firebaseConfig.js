import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB8HRXKThDHvEDd9-tz-iORol4X21Pod0I",
  authDomain: "rentistan-fyp-react-native.firebaseapp.com",
  databaseURL: "https://rentistan-fyp-react-native-default-rtdb.firebaseio.com",
  projectId: "rentistan-fyp-react-native",
  storageBucket: "rentistan-fyp-react-native.appspot.com",
  messagingSenderId: "698955533443",
  appId: "1:698955533443:web:4f12344bd8f9c562471fb6",
  measurementId: "G-N6J0FEZF86"
  };
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db,storage };
