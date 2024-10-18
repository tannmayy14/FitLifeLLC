// import React, { useState } from 'react';
// import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { auth } from './firebaseConfig';
// import { useNavigate } from 'react-router-dom';
// import { getFirestore, doc, setDoc } from 'firebase/firestore';

// function SignUp() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const db = getFirestore();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       await updateProfile(user, { displayName: name });

//       await setDoc(doc(db, "users", user.uid), {
//         name,
//         age,
//         gender,
//         email
//       });

//       console.log('Sign up successful');
//       navigate('/');
//     } catch (error) {
//       setError(error.message);
//       console.error('Error signing up:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Full Name"
//         required
//       />
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         required
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         required
//       />
//       <input
//         type="number"
//         value={age}
//         onChange={(e) => setAge(e.target.value)}
//         placeholder="Age"
//         required
//       />
//       <select
//         value={gender}
//         onChange={(e) => setGender(e.target.value)}
//         required
//       >
//         <option value="">Select Gender</option>
//         <option value="male">Male</option>
//         <option value="female">Female</option>
//         <option value="other">Other</option>
//       </select>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// }

// export default SignUp;

// import React, { useState } from 'react';
// import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { auth } from './firebaseConfig';
// import { useNavigate } from 'react-router-dom';
// import { getFirestore, doc, setDoc,getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/firestore';
// import './SignUp.css'; // External CSS for styling
// function SignUp() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('');
//   const [height, setHeight] = useState('');
//   const [weight, setWeight] = useState('');
//   const [medicalHistory, setMedicalHistory] = useState('');
//   const [photo, setPhoto] = useState(null);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const db = getFirestore();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
  
//       await updateProfile(user, { displayName: name });
  
//       let photoURL = null;
//       if (photo) {
//         const storage = getStorage();
//         const photoRef = ref(storage, `userPhotos/${user.uid}`);
//         const snapshot = await uploadBytes(photoRef, photo);
//         photoURL = await getDownloadURL(snapshot.ref);
//       }
  
//       await setDoc(doc(db, "users", user.uid), {
//         name,
//         age,
//         gender,
//         email,
//         height,
//         weight,
//         medicalHistory,
//         photoURL // Store the download URL instead of the File object
//       });
  
//       console.log('Sign up successful');
//       navigate('/');
//     } catch (error) {
//       setError(error.message);
//       console.error('Error signing up:', error);
//     }
//   };
//   return (
//     <div className="signup-container">
//       <div className="signup-left">
//         <img src="./src/assets/signInBack.jpg" alt="Gym" className="signup-image" />
//         <button onClick={() => navigate('/')} className="back-button">Back to Website</button>
//       </div>
//       <div className="signup-right">
//         <h2>Create an Account</h2>
//         <form onSubmit={handleSubmit} className="signup-form">
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Full Name"
//             required
//             className="input-field"
//           />
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             required
//             className="input-field"
//           />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             required
//             className="input-field"
//           />
//           <input
//             type="number"
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//             placeholder="Age"
//             required
//             className="input-field"
//           />
//           <input
//             type="number"
//             value={height}
//             onChange={(e) => setHeight(e.target.value)}
//             placeholder="Height (cm)"
//             required
//             className="input-field"
//           />
//           <input
//             type="number"
//             value={weight}
//             onChange={(e) => setWeight(e.target.value)}
//             placeholder="Weight (kg)"
//             required
//             className="input-field"
//           />
//           <textarea
//             value={medicalHistory}
//             onChange={(e) => setMedicalHistory(e.target.value)}
//             placeholder="Medical History"
//             className="input-field textarea"
//           ></textarea>
//           <input
//             type="file"
//             onChange={(e) => setPhoto(e.target.files[0])}
//             placeholder="Upload Photograph"
//             className="input-field"
//           />
//           {error && <p style={{ color: 'red' }}>{error}</p>}
//           <button type="submit" className="signup-button">Sign Up</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default SignUp;
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import './SignUp.css'; // External CSS for styling

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const db = getFirestore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "users", user.uid), {
        name,
        age,
        gender,
        email,
        height,
        weight,
        medicalHistory,
        photo
      });

      console.log('Sign up successful');
      navigate('/');
    } catch (error) {
      setError(error.message);
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <img src="./src/assets/signInBack.jpg" alt="Gym" className="signup-image" />
        <button onClick={() => navigate('/')} className="back-button">Back to Website</button>
      </div>
      <div className="signup-right">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
            className="input-field"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="input-field"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="input-field"
          />
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
            required
            className="input-field"
          />
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Height (cm)"
            required
            className="input-field"
          />
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Weight (kg)"
            required
            className="input-field"
          />
          <textarea
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
            placeholder="Medical History"
            className="input-field textarea"
          ></textarea>
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            placeholder="Upload Photograph"
            className="input-field"
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
