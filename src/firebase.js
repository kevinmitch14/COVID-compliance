import firebase from 'firebase/app';
import 'firebase/firestore'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD1bxWXw7VbZ1_a1iCwJcN7G9X7H4LDZ50",
    authDomain: "covid-compliance-react-app.firebaseapp.com",
    databaseURL: "https://covid-compliance-react-app.firebaseio.com",
    projectId: "covid-compliance-react-app",
    storageBucket: "covid-compliance-react-app.appspot.com",
    messagingSenderId: "232535240441",
    appId: "1:232535240441:web:43dd75c5962b1f5ca2bc28"
});

const db = firebaseApp.firestore();

export default db;
