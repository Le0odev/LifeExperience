// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCmxs_ymbMvMA-s-RfbWkC7FstC_itDsOo",
    authDomain: "lifee-3c9d9.firebaseapp.com",
    projectId: "lifee-3c9d9",
    storageBucket: "lifee-3c9d9.appspot.com",
    messagingSenderId: "1087965188859",
    appId: "1:1087965188859:web:c9c1d5471ebfff627ed65e",
    measurementId: "G-M2HB6P8YGP"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app); // Inicializa o Auth
const storage = getStorage(app);

export { db, storage, auth, analytics };
