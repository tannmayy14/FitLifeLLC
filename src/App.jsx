
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import BackContainer from './LandingPage';
import HomeNavbar from './HomeNavbar';
import ExercisePlans from './pages/ExercisePlans';
import CustomizedPlans from './pages/CustomizedPlans';
import PersonalTrainer from './pages/PersonalTrainer';
import Equipments from './pages/Equipments';
import PricingPage from './pages/Pricing';
import AboutUs from './pages/AboutUs';
import PaymentSuccess from './pages/PaymentSuccess';
import SignIn from './SignIn';  // Add this import
import SignUp from './SignUp';
import './global.css';
import Footer from './Footer'; // Add this import
import OurServices from './ourServices';
import { PremiumRoute, AuthRoute } from './ProtectedRoute.jsx';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { auth, db } from './firebaseConfig'; // You'll need to create this file if you haven't already
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LoadingSpinner = () => (
  <Box 
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}
  >
    <CircularProgress />
  </Box>
);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your actual Firebase auth code
const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
  if (userAuth) {
    try {
      const userDoc = await getDoc(doc(db, 'users', userAuth.uid));
      if (userDoc.exists()) {
        setUser({ ...userAuth, ...userDoc.data() });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  } else {
    setUser(null);
  }
  setLoading(false);
});

return () => unsubscribe();
}, []);

if (loading) {
return <LoadingSpinner />;
}

return (
<Router>
  <div>
    <HomeNavbar user={user} />
    <Routes>
      <Route path="/" element={<BackContainer />} />
      <Route 
        path="/exercise-plans" 
        element={<ExercisePlans />} 
      />
      <Route 
        path="/customized-plans" 
        element={
          <PremiumRoute user={user}>
            <CustomizedPlans />
          </PremiumRoute>
        } 
      />
      <Route 
        path="/personal-trainer" 
        element={
          <PremiumRoute user={user}>
            <PersonalTrainer />
          </PremiumRoute>
        } 
      />
      <Route path="/equipments" element={<Equipments />} />
      <Route 
        path="/pricing" 
        element={
          <PricingPage 
            user={user}
            onNavigate={(path) => navigate(path)}
            onUpdateUser={async (userData) => {
              if (user) {
                await setDoc(doc(db, 'users', user.uid), userData, { merge: true });
                setUser(prev => ({ ...prev, ...userData }));
              }
            }}
          />
        } 
      />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/our-services" element={<OurServices />}/>

    </Routes>
    <Footer />
  </div>
  <ToastContainer
  position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
/>
</Router>
);
}

export default App;
//   return (
//     <Router>
//       <div>    
//         <HomeNavbar />
//         <Routes>
//           <Route path="/" element={<BackContainer />} />
//           <Route path="/exercise-plans" element={<ExercisePlans />} />
//           <Route path="/customized-plans" element={<CustomizedPlans />} />
//           <Route path="/personal-trainer" element={<PersonalTrainer />} />
//           <Route path="/equipments" element={<Equipments />} />
//           <Route path="/pricing" element={<PricingPage />} />
//           <Route path="/about-us" element={<AboutUs />} />
//           <Route path="/signin" element={<SignIn />} />
//           <Route path="/signup" element={<SignUp />} />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   )
// }

// export default App
