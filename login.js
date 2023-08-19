// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
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


const loginBtn = document.querySelector("#loginBtn")
loginBtn.addEventListener("click", login)

async function login(e) {
    try {

        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        console.log(email, password)
        const userLogin = await signInWithEmailAndPassword(auth, email, password)
        console.log(userLogin)


        const userRef = doc(db, "users", userLogin.user.uid);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            alert("invalid user")
            return
        }

        console.log("Document data:", docSnap.data());
        const userData = docSnap.data()
        localStorage.setItem("user", JSON.stringify(userData))
        window.location.assign("/dashboard.html")

    } catch (error) {
        console.log("error", error.message)

        loginBtn.className = "btn btn-danger"
        loginBtn.innerHTML = `Login`
        alert(error.message)
    }


}