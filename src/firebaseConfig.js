
import {initializeApp} from 'firebase/app'
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBElDERIxKAGeASFs1_T9UKcqvDzO0V2Yw",
    authDomain: "estoqueapp-511bd.firebaseapp.com",
    projectId: "estoqueapp-511bd",
    storageBucket: "estoqueapp-511bd.appspot.com",
    messagingSenderId: "87481138655",
    appId: "1:87481138655:web:5f922b9a6e786021c2586a",
    measurementId: "G-D7MTKV9KRT"
  };

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app);
  const db = getFirestore(app)

  export {db, auth}