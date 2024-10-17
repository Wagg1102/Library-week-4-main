import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyDx2UvV43Q0WsCtttdvchlJjyjfv5TEsLw",
    authDomain: "week7-haowen.firebaseapp.com",
    projectId: "week7-haowen",
    storageBucket: "week7-haowen.appspot.com",
    messagingSenderId: "777109832773",
    appId: "1:777109832773:web:6c24190a05e7f693d1cf2c"
};


if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const db = getFirestore()
export default db