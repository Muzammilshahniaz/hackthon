import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

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

const logoutBtn = document.getElementById("logout")
    const getUser = document.getElementById("getUser")
    
    const productCollection = collection(db, "users")
    const ProductForm = document.getElementById("productForm")
    ProductForm.addEventListener("submit", addproduct)
    window.addEventListener("load", getProduct)
    window.addEventListener("load", loginUser)
    const productParent = document.getElementById("productParent")
    function loginUser() {
        if (localStorage.getItem("user") === null) {
            window.location.replace("../index.html")
            return
        }
    }
    
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);
    
            if (userDoc.exists()) {
                const userData = userDoc.data();
                getUser.textContent = `${userData.fullName}`;
            }
        }
    })
    
    async function getProduct() {
        console.log("getProduct")
        const getProduct = await getDocs(productCollection)
        getProduct.forEach(function (doc) {
            console.log(doc.data())
            const getData = doc.data();
            console.log(getData)
            productParent.innerHTML += `<div class="card" style="width: 18rem; ">
            <div class="card-body">
                <h5 class="card-title">${getData.name}</h5>
                <p class="card-text">${getData.desc}</p>
                <button class="edit-button btn btn-primary">Edit</button>
          <button class="delete-button btn btn-danger">Delete</button>
            </div>
        </div>
            
            `
        })
    
    }
    
    async function addproduct(e) {
        e.preventDefault();
        try {
            const productName = e.target.productName.value
            const productDesc = e.target.productDesc.value
            if(!productName || !productDesc){
                alert("Please Enter Input Field")
                return
            }
            const user = JSON.parse(localStorage.getItem("user"))
            const productObj = {
                name: productName,
                desc: productDesc,
            }
            console.log("Add", productObj)
    
            await addDoc(productCollection, productObj)
            alert("Product Added Successfully")
    
    
        } catch (error) {
            alert(error.message)
        }
    
    }
    document.addEventListener('click', function () {
        const editButtons = document.querySelectorAll('.edit-button');
        const deleteButtons = document.querySelectorAll('.delete-button');
      
        editButtons.forEach(button => {
          button.addEventListener('click', function () {
            const itemText = this.parentNode.querySelector('.card-text');
            const newText = prompt('Edit the item:', itemText.textContent);
            if (newText !== null) {
              itemText.textContent = newText;
            }
          });
        });
      
        deleteButtons.forEach(button => {
          button.addEventListener('click', function () {
            const item = this.parentNode;
            if (confirm('Are you sure you want to delete this item?')) {
              item.parentNode.removeChild(item);
            }
          });
        });
      })