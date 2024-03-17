import React, { useState } from 'react';
import Logo from '../Images/Logo.png';
import clinicphoto from '../Images/clinic_photo.jpg';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import httpClient from '../utils/httpClient';

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const loginUser = async () => {
    console.log(email, password);
    try {
      const response = await httpClient.post("//localhost:5000/login", {
        email,
        password,
      })
      console.log(response.status)

      if (response.status === 200) {
        toast.success("Logged in Succefully!")
        navigate("/")
      } else if (response.status === 401) {
        toast.error("Invalid credentials")
      } else {
        toast.error("An error occurred. Please try again later.")
      }

    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid credentials") // Show toast message for invalid credentials
      } else {
        toast.error("An error occurred. Please try again later.") // Generic error message
      }

    }
  }
  return (
    <>
      <div className="container flex h-screen ">
        {/* Left half */}
        <div className="flex flex-col justify-center items-center w-1/2 ">
          <img src={Logo} alt="logoImage" className="w-32 mb-8" />
          <h1 className="text-3xl font-poppins font-semibold mb-10 text-lightBlue">Login to your Account</h1>
          <div className="flex flex-col mb-6">
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email ID" className="border-2 border-lightBlue outline-lightBlue rounded-md py-2 px-3 mb-3 font-poppins text-sm" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border-2 border-lightBlue outline-lightBlue rounded-md py-2 px-3 mb-3 font-poppins text-sm" />
            <button className="bg-lightBlue text-white rounded-md py-2 px-4" onClick={loginUser}>Login</button>
          </div>
        </div>
        {/* Right half */}
        <div className="w-1/2">
        <div style={{backgroundImage: `url(${clinicphoto})`, backgroundSize: 'cover', backgroundPosition: 'right'}} className="h-full"></div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
