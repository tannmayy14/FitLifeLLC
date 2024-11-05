
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import BackContainer from './LandingPage';
import HomeNavbar from './HomeNavbar';
import ExercisePlans from './pages/ExercisePlans';
import CustomizedPlans from './pages/CustomizedPlans';
import PersonalTrainer from './pages/PersonalTrainer';
import Equipments from './pages/Equipments';
import Pricing from './pages/Pricing';
import AboutUs from './pages/AboutUs';
import SignIn from './SignIn';  // Add this import
import SignUp from './SignUp';
import Footer from './footer';
import OurServices from './ourServices';


function App() {
  return (
    <Router>
      <div>    
        <HomeNavbar />
        <Routes>
          <Route path="/" element={<BackContainer />} />
          <Route path="/exercise-plans" element={<ExercisePlans />} />
          <Route path="/customized-plans" element={<CustomizedPlans />} />
          <Route path="/personal-trainer" element={<PersonalTrainer />} />
          <Route path="/equipments" element={<Equipments />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/our-services" element={<OurServices />}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
