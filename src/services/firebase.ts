import {initializeApp} from 'firebase/app'
import {
  getDatabase, 
  set as firebaseSet, 
  ref as firebaseRef, 
  push as firebasePush, 
  child as firebaseChild, 
  update as firebaseUpdate, 
  get as firebaseGet
} from 'firebase/database'
import {GoogleAuthProvider, signInWithRedirect, getAuth, getRedirectResult, onAuthStateChanged, signOut} from 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  };

  const app = initializeApp(firebaseConfig)
  const database = getDatabase(app)

  export {
    GoogleAuthProvider, 
    getAuth, 
    signInWithRedirect, 
    getRedirectResult, 
    onAuthStateChanged,
    signOut,
    database,
    firebaseSet,
    firebaseRef,
    firebasePush,
    firebaseChild,
    firebaseUpdate,
    firebaseGet
  }