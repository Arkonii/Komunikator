// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebaseConfig from './Config';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
let app = null;
let analytics = null;
let auth = null;

try {
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    auth = getAuth();
} catch (error) {
    console.error("Firebase initialization error:", error);
}

// Function for handling login
const handleLogin = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Login successful
        const user = userCredential.user;
        console.log("User logged in:", user);
        const token = await userCredential.user.getIdToken();
        await AsyncStorage.setItem('userToken', token);
        console.log('Token saved successfully');
        await AsyncStorage.setItem('currentUser',JSON.stringify(user));
        console.log('User stored successfully');
        return user;
    } catch (error) {
        // Login failed
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Login error:", errorCode, errorMessage);
        return null;
    }
};

export { handleLogin };


const handleRegistration = async (email, password, name) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // Update user profile with name
        await updateProfile(user, { displayName: name });
        console.log('User registered:', user);
        return user;
    } catch (error) {
        // Registration failed
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Registration error:', errorCode, errorMessage);
        return null;
    }
};

export { handleRegistration };

const getCurrentUser = () => {
    const user = auth.currentUser;
    const displayName = auth.currentUser.displayName;
    if (user) {
        return displayName;
    } else {
        return null;
    }
};

export { getCurrentUser };

const checkUserToken = async () => {
    const user = auth.currentUser;
    if (user) {
        try {
            const idToken = await user.getIdToken();
            const value = await AsyncStorage.getItem('userToken');
            if(value!==idToken){
                console.log('User token is incorrect');
                return false;
            }
            console.log('User token is correct:', idToken);
        } catch (error) {
            console.error('Error while getting user token:', error);
            return false;
        }
    } else {
        console.log('User is not logged in');
        return false;
    }
    return true;
};

export { checkUserToken };
