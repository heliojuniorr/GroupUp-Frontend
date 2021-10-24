import {initializeApp} from 'firebase/app'
import {GoogleAuthProvider, signInWithRedirect, getAuth, getRedirectResult, onAuthStateChanged} from 'firebase/auth'

console.log("REACT_APP_API_KEY")
console.log(process.env.REACT_APP_API_KEY)
console.log("REACT_APP_APIKEY")
console.log(process.env.REACT_APP_APIKEY)
console.log("FIREBASE_API_KEY")
console.log(process.env.FIREBASE_API_KEY)
console.log("FIREBASE_APIKEY")
console.log(process.env.FIREBASE_APIKEY)

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  };

  initializeApp(firebaseConfig)

  export {GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult, onAuthStateChanged}