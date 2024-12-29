import firebase from 'firebase/compat/app'
import {getDatabase} from'firebase/database'
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBcpiHo25O14vjElt_hbi4pRd3qO6X5lx8",
    authDomain: "the-daily-scroll.firebaseapp.com",
    projectId: "the-daily-scroll",
    storageBucket: "the-daily-scroll.firebasestorage.app",
    messagingSenderId: "510280988419",
    appId: "1:510280988419:web:e4784ec699308933035b36",
    measurementId: "G-3ZLT5H0P1T"
  };
 export const app = initializeApp(firebaseConfig);