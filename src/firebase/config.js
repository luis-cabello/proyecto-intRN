import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCke851XSeyiR5Q4bavhcMjzNC-UjxKr1Y",
    authDomain: "proyecto-int-3-2.firebaseapp.com",
    projectId: "proyecto-int-3-2",
    storageBucket: "proyecto-int-3-2.appspot.com",
    messagingSenderId: "679285073447",
    appId: "1:679285073447:web:1b09295279ca371a455002"
  };

  app.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const storage = app.storage();
  export const db = app.firestore();

