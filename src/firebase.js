import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, 
        getAuth, 
        signInWithEmailAndPassword, 
        signOut} from "firebase/auth";
import { addDoc, 
        collection, 
        getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBfnY5XEKw1n2xTUBwzN_HZoUOkVWIziJ0",
  authDomain: "netflix-clone-3a9d5.firebaseapp.com",
  projectId: "netflix-clone-3a9d5",
  storageBucket: "netflix-clone-3a9d5.appspot.com",
  messagingSenderId: "901250836624",
  appId: "1:901250836624:web:e2dad99dede2b9d3f85015",
  measurementId: "G-7E4V1FH8XX"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login = async(email, password)=>{
    try {
       await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}
const logout = () => {
    signOut(auth);
}

export {auth, db, login, signup, logout}