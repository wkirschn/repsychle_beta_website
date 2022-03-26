console.log("Index.js works!");


// Tutorial Reference : https://www.youtube.com/watch?v=2yNyiW_41H8&list=PL4cUxeGkcC9jERUGvbudErNCeSZHWUVlb&index=4

// First we need to import Firebase based on our needs due to TreeShaking


import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

    apiKey: "AIzaSyCVIOy2sBWdHFPTI6L2ZLtGBhToXBxd32Y",
    authDomain: "repsychle-website.firebaseapp.com",
    projectId: "repsychle-website",
    storageBucket: "repsychle-website.appspot.com",
    messagingSenderId: "11513955707",
    appId: "1:11513955707:web:c9f1c402c07821461e29de",
    measurementId: "G-KEBDJE6LS8"
}


// We need to init the Firebase App

initializeApp(firebaseConfig)

// init the services

const db = getFirestore()