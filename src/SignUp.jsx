// import React, { useState } from 'react';
// import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { auth, db } from './firebaseConfig';
// import { useNavigate } from 'react-router-dom';
// import { getFirestore, doc, setDoc } from 'firebase/firestore';
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     console.log("Form submitted");

//     const storage = getStorage();
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
      
//       let photoURL = '';
//       if (photo) {
//         const photoRef = ref(storage, `profilePhotos/${user.uid}`);
//         await uploadBytes(photoRef, photo);
//         photoURL = await getDownloadURL(photoRef);
//       }
//       await updateProfile(user, { displayName: name });

//       await setDoc(doc(db, "users", user.uid), {
//         name,
//         age,
//         gender,
//         email,
//         height,
//         weight,
//         medicalHistory,
//         photoURL
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
import { auth, db } from './firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ToastContainer,toast } from 'react-toastify'; // Importing toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS
import './SignUp.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male'); // Default to male
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const storage = getStorage();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let photoURL = '';
      if (photo) {
        const photoRef = ref(storage, `profilePhotos/${user.uid}`);
        await uploadBytes(photoRef, photo);
        photoURL = await getDownloadURL(photoRef);
      }
      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "users", user.uid), {
        name,
        age: parseInt(age), // Convert to number
        gender: gender === 'male', // Boolean for gender
        email,
        height: parseInt(height), // Convert to number
        weight: parseInt(weight), // Convert to number
        medicalHistory,
        photoURL
      });

      toast.success('Sign up successful!', { position: 'top-right', autoClos: 3000, });
      navigate('/');
    } catch (error) {
      setError(error.message);
      toast.error(`Error: ${error.message}`, { position: 'top-right', autoClos: 3000, });
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer />
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
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
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
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="input-field"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
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
