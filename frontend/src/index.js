import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const settings = {
  autoClose: 3000,
  position: "bottom-center",
  transition: Slide
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer {...settings} />
    <App />
  </React.StrictMode>
);


