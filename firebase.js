<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
  import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBdX8_tD0EcQp05jVYytNsKutC0eiefEmo",
    authDomain: "church-website-7f573.firebaseapp.com",
    projectId: "church-website-7f573",
    storageBucket: "church-website-7f573.appspot.com",
    messagingSenderId: "617823619537",
    appId: "1:617823619537:web:8e3c89d4a9e53db92678f0",
    measurementId: "G-MR0G5593YW"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app); // Initialize Firestore
</script>
