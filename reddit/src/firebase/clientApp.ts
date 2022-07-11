
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC2K4qgOVh7KNPOL34j_488Y8SPIRlsYbQ",
    authDomain: "api-demo-293411.firebaseapp.com",
    projectId: "api-demo-293411",
    storageBucket: "api-demo-293411.appspot.com",
    messagingSenderId: "881864823929",
    appId: "1:881864823929:web:72ffc4a92c9d2a0ab230a8",
    measurementId: "G-E61GJNNRJH"
};


const app = !getApps().length ? initializeApp(firebaseConfig): getApp(); // checking app exist then init
const firestore = getFirestore(app) // get firestore json
const auth = getAuth(app) // auth state
const storage = getStorage(app) // luu tru anh , video

export { app, firestore, auth, storage };
