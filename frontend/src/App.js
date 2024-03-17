import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import CommunityPage from './components/CommunityPage';
import CreatePost from './components/CreatePost';


function App() {
  return (
    <>
      <Router>

        <Routes>
          <Route exact path='/login' element={<LoginPage />} />
          <Route exact path='/register' element={<RegisterPage />} />
          <Route exact path='/community' element={<CommunityPage />} />
          <Route exact path='/community/post' element={<CreatePost />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
