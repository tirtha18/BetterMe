import React, { useState, useEffect } from 'react';
import httpClient from '../utils/httpclient';
import Avatar from '../Images/avatar.png';
import { toast } from 'react-toastify';
export default function SpeciDoctors(props) {
    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                console.log('//localhost:5000/doctors/${spe}');
                const response = await httpClient.get("//localhost:5000/doctors/" + props.specialization);
                console.log(response);
                setDoctors(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDoctors();
    }, [props.specialization]);
    const bookAppointment = async (doc_id) => {
        try{
            const response = await httpClient.post("//localhost:5000/bookappointment",{doctor_id: doc_id})
            toast.success("Appointment Booked Succesfully!")
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className=" h-full py-4 w-screen flex flex-col justify-center items-center">
            <div className="mt-36">
            <h1 className="text-3xl font-bold mb-12 capitalize">{props.specialization} available:</h1>
            <ul className=" flex flex-col space-y-4">
                {doctors.map((doctor) => (
                    <div key={doctor.id} className="w-[600px] bg-lightBlue h-60 rounded-lg flex flex-row items-center justify-center">
                        <img className= " h-[170px] w-[170px] rounded-full mr-12 " src={Avatar}/>    
                        <div className=" flex flex-col text-white space-y-6">
                        <p className="text-5xl font-semibold ">{doctor.doctor_name}</p>
                        <div className="flex flex-row space-x-12"><p className="text-xl font-semibold">{doctor.time_slot}</p><button onClick={() => {bookAppointment(doctor.id)}} className="text bg-white px-4 py-[1px] font-bold rounded-lg text-lightBlue hover:scale-105 duration-200 shadow-lg">Book Slot</button></div> 
                        </div>
                    </div>
                ))}
            </ul>
            </div>
        </div>
    );
}
