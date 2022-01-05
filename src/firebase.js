import firebase from "firebase";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCJr7QS9oiHlveBhmXQV0CHpQE11iD8FOI",
  authDomain: "auth-development-3b7b6.firebaseapp.com",
  databaseURL: "https://auth-development-3b7b6-default-rtdb.firebaseio.com",
  projectId: "auth-development-3b7b6",
  storageBucket: "auth-development-3b7b6.appspot.com",
  messagingSenderId: "881199061944",
  appId: "1:881199061944:web:29e87237190dc9e1e2cd4d",
});

export default app;
export const auth = app.auth();
export const database = firebase.database();