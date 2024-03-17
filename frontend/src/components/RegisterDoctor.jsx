import React, { useState } from 'react';
import Logo from '../Images/logo.png';
import doctor_img from '../Images/doctor_img.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import httpClient from '../utils/httpclient';


const RegisterDoctor = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [specialization, setSpecialization] = useState("")
    const [time_slot, setTimeSlot] = useState("")
    const navigate = useNavigate()

    const registerDoctor = async () => {
        console.log(email, password);

        try {
            const response = await httpClient.post("//localhost:5000/register/doctor", {
                name,
                email,
                password,
                specialization,
                time_slot,
            })

            console.log(response.status)
            console.log(response.data.message)

            if (response.status === 200) {
                toast.success("Successfully Registered! Please login with your Credentials now")
                navigate("/login")
            } else {
                toast.error("An error occured. Please try again later")
            }

        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error("Please fill out all the fields with relevant data") // Show toast message for invalid credentials
            } else {
                toast.error("An error occurred. Please try again later.") // Generic error message
            }

        }
    }

    return (
        <>
            <div className="container flex h-screen">
                {/* Left half */}
                <div className="flex flex-col justify-center items-center w-1/2">
                    <img src={Logo} alt="logoImage" className="w-32 mb-4" />
                    <h1 className="text-3xl font-poppins font-semibold mb-6 text-lightBlue">Register to our service</h1>
                    <div className="flex flex-col mb-6">
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}  placeholder="Name" className="border-2 border-lightBlue outline-lightBlue rounded-md py-2 px-3 mb-3 font-poppins text-sm" />
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="Email ID" className="border-2 border-lightBlue outline-lightBlue rounded-md py-2 px-3 mb-3 font-poppins text-sm" />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border-2 border-lightBlue outline-lightBlue rounded-md py-2 px-3 mb-3 font-poppins text-sm" />
                        <input type="text" placeholder="Specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} className="border-2 border-lightBlue outline-lightBlue rounded-md py-2 px-3 mb-3 font-poppins text-sm" />
                        <input type="text" placeholder="Time Slot of Availability" value={time_slot} onChange={(e) => setTimeSlot(e.target.value)} className="border-2 border-lightBlue outline-lightBlue rounded-md py-2 px-3 mb-3 font-poppins text-sm" />
                        <button className="bg-lightBlue text-white rounded-md py-2 px-4" onClick={registerDoctor}>Sign Up</button>
                    </div>
                </div>
                {/* Right half */}
                <div className="w-1/2">
                    <div style={{backgroundImage: `url(${doctor_img})`, backgroundSize: 'cover', backgroundPosition: 'right'}} className="h-full"></div>
                </div>
            </div>
        </>
    );
};

export default RegisterDoctor;