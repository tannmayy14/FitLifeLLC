import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, addDoc, getDoc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db = getFirestore(app); // Initialize and export Firestore
const analytics = getAnalytics(app);
export default app;


const sampleProfessionals = [];

// Function to populate the database with sample data
export const populateDatabase = async () => {
  try {
    const professionalsRef = collection(db, 'professionals');
    
    for (const professional of sampleProfessionals) {
      await addDoc(professionalsRef, professional);
    }
    
    console.log('Database populated successfully');
  } catch (error) {
    console.error('Error populating database:', error);
  }
};

// Function to add a single professional
export const addProfessional = async (professionalData) => {
  try {
    const professionalsRef = collection(db, 'professionals');
    const docRef = await addDoc(professionalsRef, professionalData);
    console.log('Professional added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding professional:', error);
    throw error;
  }
};

// Optional: Function to clear all professionals (be careful with this!)
export const clearProfessionals = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'professionals'));
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    console.log('All professionals deleted');
  } catch (error) {
    console.error('Error clearing professionals:', error);
  }
};




