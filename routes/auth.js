// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCVIOy2sBWdHFPTI6L2ZLtGBhToXBxd32Y",
    authDomain: "repsychle-website.firebaseapp.com",
    projectId: "repsychle-website",
    storageBucket: "repsychle-website.appspot.com",
    messagingSenderId: "11513955707",
    appId: "1:11513955707:web:c9f1c402c07821461e29de",
    measurementId: "G-KEBDJE6LS8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Make auth and Firestore References

const auth = firebase.auth();
const db = firebase.firestore();

// Update Firestore Settings

db.settings({timestampsInSnapshots : true})



// Signup JavaScript
console.log("Register Click");
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) =>{

    const auth = firebase.auth();
    const db = firebase.firestore();

    e.preventDefault();
    // First we need to set the variables a nd have the values for each input placed in their respective place
    const firstName = signupForm['firstName'].value;
    const lastName = signupForm['lastName'].value;
    const emailAddress = signupForm['emailAddress'].value;
    const emailAddressConfirm = signupForm['emailAddressConfirm'].value;
    const password = signupForm['password'].value;
    const passwordConfirm = signupForm['passwordConfirm'].value;

    // This is to test to see if we can log each one!

    console.log("First Name is: " + firstName);
    console.log("Last Name is: " + lastName);
    console.log("Email Address is: " + emailAddress);
    console.log("Repeat Email Address is: " + emailAddressConfirm);
    console.log("Password is: " + password);
    console.log("Password Confirm is: " + passwordConfirm);

    // Now, we need to validate to see if the values are valid

 /*   if(password == passwordConfirm && (password.length > 7 && passwordConfirm.length > 7)) {
        console.log("Woah!");
    }*/

})

auth.createUserWithEmailAndPassword(emailAddress, password).then(function () {

    window.location.replace('/test');
}).catch(function (error) {
    //Errors

    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);

})