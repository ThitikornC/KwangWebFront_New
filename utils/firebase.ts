// ~/plugins/firebase.ts
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDRWHlu9SH93htyBkr45IQuj9mjwIYaDCI",
  authDomain: "momay-4a073.firebaseapp.com",
  projectId: "momay-4a073",
  storageBucket: "momay-4a073.firebasestorage.app",
  messagingSenderId: "156392943861",
  appId: "1:156392943861:web:675e3bd2853697158295bc",
  measurementId: "G-WSNR4Y2CQ4"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, uploadBytes, getDownloadURL };
