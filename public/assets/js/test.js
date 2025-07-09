import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeaeawL7TURURO_kxr_PqF0LnORLM26TU",
  authDomain: "korean3000cshack.firebaseapp.com",
  projectId: "korean3000cshack",
  storageBucket: "korean3000cshack.firebasestorage.app",
  messagingSenderId: "230179753866",
  appId: "1:230179753866:web:bebaa526146c4065bec273",
  measurementId: "G-KE7EJN1Z8Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("infoForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const fname = document.getElementById("firstName").value;
  const lname = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;

  await addDoc(collection(db, "users"), {
    fname: fname,
    lname: lname,
    email: email,
    createdAt: new Date(),
  });

  alert("Data saved!");
});
