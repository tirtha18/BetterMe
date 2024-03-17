import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';
import RegisterDoctor from './Components/RegisterDoctor'
import RegisterPatient from './Components/RegisterPatient';
import Register from './Components/Register';
import RoomPage from './Components/RoomPage';
import NavBar from './Components/NavBar'
import About from './Components/About';
import Doctors from './Components/Doctors';
import Fitness from './Components/Fitness';
import Aicoach from './Components/Aicoach';
import SpeciDoctors from './Components/SpeciDoctors';
import DisPreForm from './Components/DisPreForm';
import DietWork from './Components/DietWork';
import CalCountPage from './Components/CalCountPage';
import Posture from './Components/Posture'
import MePatient from './Components/MePatient';
import VideoCallHome from './Components/VideoCallHome';
import CommunityPage from './Components/CommunityPage';
import CreatePost from './Components/CreatePost';


function App() {
  return (
    <>
      <Router>
        <NavBar/>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/login' element={<LoginPage />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/doctor/register' element={<RegisterDoctor />} />
          <Route exact path='/patient/register' element={<RegisterPatient />} />
          <Route exact path='/room/:roomId' element={<RoomPage />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/doctors' element={<Doctors />} />
          <Route exact path='/fitness' element={<Fitness />} />
          <Route exact path='/aicoach' element={<Aicoach />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/aicoach/dieseaseprediction' element={<DisPreForm />} />
          <Route exact path='/fitness/countcal' element={<CalCountPage/>} />
          <Route exact path='/fitness/posture' element={<Posture/>} />
          <Route exact path='/aicoach/diet' element={<DietWork />} />
          <Route exact path='/dashboard' element={<MePatient />} />
          <Route exact path='/doctors/cardiologists' element={<SpeciDoctors specialization = "cardiologists"/>} />
          <Route exact path='/doctors/neurologists' element={<SpeciDoctors specialization = "neurologists"/>} />
          <Route exact path='/doctors/dermatologists' element={<SpeciDoctors specialization = "dermatologists"/>} />
          <Route exact path='/vcpage' element={<VideoCallHome/>} />
          <Route exact path='/vcpage/room/:roomId' element={<RoomPage/>} />
          <Route exact path='/community' element={<CommunityPage/>} />
          <Route exact path='/community/post' element={<CreatePost/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;