import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './components/LoginPage';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/login' element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
