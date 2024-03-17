import React from 'react';
import { Link } from 'react-router-dom';
import Neuro from '../Images/neuro.png';
import Cardio from '../Images/cardio.png';
import Derma from '../Images/derma.png';
import Endo from '../Images/endo.png';
import Pedi from '../Images/pedi.png';
import Gp from '../Images/gp.png';
import Gyno from '../Images/gyno.png';
import Nephro from '../Images/nephro.png';

export default function Doctors() {
    const doctors = [
        {
            url: Neuro,
            name: 'Neurologist',
            path: '/doctors/neurologists' 
        },
        {
            url: Cardio,
            name: 'Cardiologist',
            path: '/doctors/cardiologists' 
        },
        {
            url: Derma,
            name: 'Dermatologist',
            path: '/doctors/dermatologists' 
        },
        {
            url: Gp,
            name: 'General Physician',
            path: '/doctors/generalphysicians'
        },
        {
            url: Pedi,
            name: 'Pediatrician',
            path: '/doctors/pediatricians' 
        },
        {
            url: Endo,
            name: 'Endocrinologist',
            path: '/doctors/endocrinologists' 
        },
        {
            url: Gyno,
            name: 'Gynecologist',
            path: '/doctors/gynecologists' 
        },
        {
            url: Nephro,
            name: 'Nephrologist',
            path: '/doctors/nephrologists' 
        }
    ];

    return (
        <div className="h-full py-4">
            <div className="w-screen flex flex-col items-center">
                <div>
                    <div className="text-3xl mt-[100px] mb-[60px] font-semibold">
                        <h1>Welcome to the</h1>
                        <h1>Doctor Consultation hub</h1>
                    </div>
                    <div className="grid grid-cols-3 gap-4 w-[610px]">
                        {doctors.map((doctor) => (
                            <Link key={doctor.name} to={doctor.path}> {/* Wrap the doctor tile with Link */}
                                <div className="bg-cover w-full h-72 flex justify-center hover:scale-105 duration-200" style={{ backgroundImage: `url(${doctor.url})` }}>
                                    <div className="text-xl text-white mt-48 font-semibold">
                                        <h1>{doctor.name}</h1>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
