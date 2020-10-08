import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAa4eiy_lkOYHtU48PfC2TWBLBvK4389Uc",
    authDomain: "whatsapp-web-chat.firebaseapp.com",
    databaseURL: "https://whatsapp-web-chat.firebaseio.com",
    projectId: "whatsapp-web-chat",
    storageBucket: "whatsapp-web-chat.appspot.com",
    messagingSenderId: "894508558972",
    appId: "1:894508558972:web:be05f408cceaebdb8477f9",
    measurementId: "G-J5ZET0SRJ8"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;


