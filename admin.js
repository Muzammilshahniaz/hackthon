// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAMDk5plgv6bG-SJaD5Rv6rFdB56BsXamU",
    authDomain: "hackton-36135.firebaseapp.com",
    projectId: "hackton-36135",
    storageBucket: "hackton-36135.appspot.com",
    messagingSenderId: "514498190682",
    appId: "1:514498190682:web:9e4d1f45d182ad1ae3e763"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);



window.addEventListener("load", getAllIUser)


async function getAllIUser() {
    console.log("getAllIUser")


    const docsRef = await getDocs(collection(db, "users"))
    docsRef.forEach(function (doc) {
        console.log("docs", doc.id, doc.data())
    })


}