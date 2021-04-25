import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBaWrsEWyaRP7hy8iU1SFjl0I021NxnHv0",
  authDomain: "messanger-clone-50fd0.firebaseapp.com",
  projectId: "messanger-clone-50fd0",
  storageBucket: "messanger-clone-50fd0.appspot.com",
  messagingSenderId: "585182894032",
  appId: "1:585182894032:web:23f5872bcdabb3c8df4bd5",
  measurementId: "G-8VGXYPGREY",
});

const db = firebaseApp.firestore();

export default db;
