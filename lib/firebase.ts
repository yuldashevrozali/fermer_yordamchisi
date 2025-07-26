// /lib/firebase.ts
import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyATIdntg0O7L7BXX78smbJq2XeBD2lF2zk",
  authDomain: "fermer-asistant.firebaseapp.com",
  projectId: "fermer-asistant",
  storageBucket: "fermer-asistant.firebasestorage.app",
  messagingSenderId: "603030858332",
  appId: "1:603030858332:web:02c0cb1bbac8d72ab75499",
  measurementId: "G-P0W6DRVLWK"
};

export const app = initializeApp(firebaseConfig)
