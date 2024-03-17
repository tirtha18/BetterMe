import React, { useState } from 'react';
import httpClient from '../utils/httpclient';

const MessageCard = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg min-h-64 min-w-96 flex flex-col relative">
        <p className="text-lg font-semibold">{message}</p>
        <button onClick={onClose} className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-lightBlue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default function DisPreForm() {
  const [symptoms, setSymptoms] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [disde, setDisde] = useState('');
  const [pre, setPre] = useState('');
  const [dis, setDis] = useState('');
  const getdisall = async () => {
    try{
    const response = await httpClient.post("//localhost:5000/predict", {symptoms : symptoms});
    console.log(response);
    const data = response.data;
    setMedicines(data.medications);
    setDisde(data.dis_des);
    setDis(data.predicted_disease);
    const p=''
    for( let i=0;i<data.precautions.length;i++)
    {
       p+=data.precautions[i];
    }
    setPre(p);
    } catch (error){
      console.log(error);
    }
  }
  const handleInputChange = (e) => {
    setSymptoms(e.target.value);
  };

  const handleClick = (message) => {
    if (formSubmitted) {
      setShowMessage(true);
      setMessageContent(message);
    }
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
    setMessageContent('');
  };

  const handleSubmit = () => {
    setFormSubmitted(true);
    getdisall();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-3xl font-semibold mt-16 mb-20">
        <h1>Welcome to the</h1>
        <h1>AI prediction arena</h1>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-lightBlue text-xl font-medium">
          <h1>Enter your symptoms</h1>
        </div>
        <div className="mt-4">
          <input className="text-xl w-[650px] border-2 border-lightBlue rounded-lg h-12 mb-28 px-2" type="text" value={symptoms} onChange={handleInputChange} />
        </div>
      </div>
      
      <div className="grid grid-cols-2 grid-rows-2 gap-10">
        <button onClick={() => handleClick(dis)} className="bg-lightBlue hover:scale-105 duration-150 text-white font-bold py-2 px-20 rounded-lg mr-8 shadow-lg text-[16px]">
          Disease
        </button>
        <button onClick={() => handleClick(pre)} className="bg-lightBlue hover:scale-105 duration-150 text-white font-bold py-2 px-20 rounded-lg ml-8 shadow-lg text-[16px]">
          Precautions
        </button>
        <button onClick={() => handleClick(medicines)} className="bg-lightBlue hover:scale-105 duration-150 text-white font-bold py-2 px-20 rounded-lg mr-8 shadow-lg text-[16px]">
          Medicine
        </button>
        <button onClick={() => handleClick(disde)} className="bg-lightBlue hover:scale-105 duration-150 text-white font-bold py-2 px-20 rounded-lg ml-8 shadow-lg text-[16px]">
          Description
        </button>
      </div>

      <button onClick={() =>{handleSubmit()}} className="mt-12 bg-lightBlue hover:scale-105 duration-150 text-white font-bold py-2 px-20 rounded-lg mr-8 shadow-lg text-[16px]">Submit</button>
      {showMessage && <MessageCard message={messageContent} onClose={() =>{handleCloseMessage();}} />}
      
    </div>
    
  );
}
