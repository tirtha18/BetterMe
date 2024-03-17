import React from 'react'
import { Link } from 'react-router-dom';
import clinicphoto from '../Images/clinic_photo.png'
import logoImage from '../Images/logo.png'


const Register = () => {
    return (
        <>
            <div className="container flex h-screen">
                {/* Left half */}
                <div className="flex flex-col justify-center items-center w-1/2">
                    <img src={logoImage} alt="logoImage" className="w-32 mb-2" />
                    <h1 className="text-3xl font-poppins font-semibold mb-2 text-lightBlue">Hi, thanks for choosing BetterMe!</h1>
                    <h1 className="text-xl font-poppins font-semibold mt-1 mb-4 text-lightBlue">Please Sign Up to continue</h1>
                    <div className="flex flex-col mb-6 mt-4">
                        <Link to={"/doctor/register"} className='btn bg-lightBlue text-white font-semibold font-poppins rounded-md py-2 px-4 mb-4'>Register as Doctor</Link>
                        <Link to={"/patient/register"} className='btn bg-lightBlue text-white font-semibold font-poppins rounded-md py-2 px-4 mt-4'>Register as Patient</Link>
                    </div>
                </div>
                {/* Right half */}
                <div className="w-1/2">
                    <div style={{ backgroundImage: `url(${clinicphoto})`, backgroundSize: 'cover', backgroundPosition: 'right' }} className="h-full"></div>
                </div>
            </div>
        </>
    );
};


export default Register