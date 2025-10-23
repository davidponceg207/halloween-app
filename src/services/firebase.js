import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDbh64Yn_gOiGWVMmywVA6-W75M1AIptdU",
    authDomain: "halloween-contest-723fe.firebaseapp.com",
    projectId: "halloween-contest-723fe",
    storageBucket: "halloween-contest-723fe.firebasestorage.app",
    messagingSenderId: "548910040619",
    appId: "1:548910040619:web:cebc189b65aeb9cbfd8c6e",
    measurementId: "G-WKW7EZTQHQ"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
