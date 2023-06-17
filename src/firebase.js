import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwfIswT9R1THSRURaMHs1HdAv12r11fmE",
  authDomain: "libary-app-d3ed2.firebaseapp.com",
  projectId: "libary-app-d3ed2",
  storageBucket: "libary-app-d3ed2.appspot.com",
  messagingSenderId: "633027822394",
  appId: "1:633027822394:web:0372db369407e28e588603",
  measurementId: "G-2J1QPHQDTH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app;