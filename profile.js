// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
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


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize AUTH
const auth = getAuth();
  


const fullNameElement = document.getElementById("fullName");
const emailElement = document.getElementById("email");
const phoneNumberElement = document.getElementById("phoneNumber");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            fullNameElement.textContent = `Full Name : ${userData.fullName}`;
            emailElement.textContent = `Email: ${user.email}`;
            phoneNumberElement.textContent = `Phone: ${userData.phoneNumber || "N/A"}`;
        }
    }
});

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.replace("./index.html");
});

