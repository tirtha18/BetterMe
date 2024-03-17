import React from 'react'
import Avatar from '../Images/avatar.png'
export default function MeDoctor() {
  return (
    <div className="h-full py-4">
        <div className="w-screen flex flex-col  mt-[85px] items-center">
            <div className=" flex flex-col">
                <div className="text-3xl font-semibold mb-4">
                    Your Profile
                </div>
                <div className="w-[600px] bg-lightBlue h-60 rounded-lg flex flex-row items-center ">
                    <img className= " h-[170px] w-[170px] rounded-full mr-12 " src={Avatar}/>
                    <div className="flex flex-col text-white">
                        <h1 className="text-4xl font-bold">
                            Jeff Bezoz
                        </h1>
                        <h2 className=" mb-12 text-gray-200">zeff.bezos@gmail.com</h2>
                        <div className=" text-xl flex flex-row space-x-8"><p>Specialization: Cardiologist</p></div>
                    </div>
                </div>
                <div className="w-[600px] h-full mt-36">
                    <div className="text-3xl font-semibold mb-5">
                        Your Appointmens:
                    </div>
                    <div className="w-full flex-col flex text-lightBlue space-y-3">
                        <div className="flex flex-row items-center justify-between border-2 borderda border-lightBlue rounded-lg p-2 "><p className=" text-xl font-semibold border-dashed px-2 py-1">Sam Altman</p><p className=" border-2 border-dashed px-2 rounded-lg py-1 border-lightBlue absolute ml-64">14:00 to 15:00</p><button className="text-white bg-lightBlue py-1 px-3 rounded-lg hover:scale-105">Video Call</button></div>
                        <div className="flex flex-row items-center justify-between border-2 borderda border-lightBlue rounded-lg p-2 "><p className=" text-xl font-semibold border-dashed px-2 py-1">Elon Musk</p><p className=" border-2 border-dashed px-2 rounded-lg py-1 border-lightBlue absolute ml-64">19:00 to 20:00</p><button className="text-white bg-lightBlue py-1 px-3 rounded-lg hover:scale-105">Video Call</button></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
  )
}
