// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
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
// Initialize AUTH
const auth = getAuth();


const signupBtn = document.querySelector("#signupBtn")
signupBtn.addEventListener("click", signUp)

async function signUp(e) {
    try {
        const fullName = document.getElementById("fullName").value
        const phoneNumber = document.getElementById("phoneNumber").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const userType = document.getElementById("userType")

        if (!fullName || !phoneNumber || !email || !password) {
            alert("required field are missing")
            return
        }
        // if (userType.selectedIndex === 0) {
        //     alert("please select user type")
        //     return
        // }
        const userAuth = await createUserWithEmailAndPassword(auth, email, password)
        console.log(userAuth.user.uid)
        const uid = userAuth.user.uid
        const userObj = {
            fullName,
            phoneNumber,
            email,
            accountActivate: true,
            uid,
        }
        const userRef = doc(db, "users", uid);
        const userDB = await setDoc(userRef, userObj)
        window.location.assign("/")
    }
     catch (error) {
        console.log("error", error.message)
        alert(error.message)
    }


}