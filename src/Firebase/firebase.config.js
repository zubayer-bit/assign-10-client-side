// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBl_o0kn06Zn_cZ_9NV9sQ6f3jJj8Yj4lE",
  authDomain: "tree-plantation-36d66.firebaseapp.com",
  projectId: "tree-plantation-36d66",
  storageBucket: "tree-plantation-36d66.firebasestorage.app",
  messagingSenderId: "638098584986",
  appId: "1:638098584986:web:c1bdefd0225b746f36f623"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
