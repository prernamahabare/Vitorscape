import firebase from "firebase";
import "firebase/auth";


const app = firebase.initializeApp({
  apiKey: "AIzaSyBJG_M9UYsVHMZcnjiFkrjd4KBtz_-pnTY",
  authDomain: "fir-auth-c2276.firebaseapp.com",
  databaseURL: "https://fir-auth-c2276-default-rtdb.firebaseio.com/",
  projectId: "fir-auth-c2276",
  storageBucket: "fir-auth-c2276.appspot.com",
  messagingSenderId: "252135233646",
  appId: "1:252135233646:web:e584448e3608fddd7e6e7f",
  measurementId: "G-GF9VGV53V0"
});

export default app;
export const auth = app.auth();
export const database = firebase.database();