// import './App.css'
// import BackContainer from './LandingPage';
// import  HomeNavbar  from './HomeNavbar';
// function App() {

//   return (
//     <div>    
//     <HomeNavbar />
//       <BackContainer />
//     </div>
//   )
// }

// export default App
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
        </Routes>
      </div>
    </Router>
  )
}

export default App