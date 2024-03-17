import React, { useState } from 'react';
import httpClient from '../utils/httpclient';
const MessageCard = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg min-h-64 min-w-96 flex flex-col relative">
        {message.map((message, index) =>(<p key={index} className="text-lg font-semibold ">{message}</p>))} 
        <button onClick={onClose} className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-lightBlue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Close
        </button>
      </div>
    </div>
  );
};
export default function DietWork() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState([]);
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [dietType, setDietType] = useState('');
  const [disabilities, setDisabilities] = useState('');
  const [diseases, setDiseases] = useState('');
  const [city, setCity] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [Dinner, setDinner] =useState([]);
  const [Breakfast, setBreakfast] =useState([]);
  const [Workout, setWorkout] =useState([]);

  const getDietW = async () => {
    try {
      const response = await httpClient.post("//localhost:5000/recommend",{age : age, weight : weight, gender : gender, height : height, veg_or_nonveg : dietType, disease : diseases, diability : disabilities, location : "Kolkata,West Bengal,India"});
      const response_data = response.data;
      const B = response_data.breakfast_recommendations;
      const D = response_data.dinner_recommendations;
      const W = response_data.workout_recommendations;
      const dinner = [];
      const breakfast = [];
      const workout = [];
      breakfast.push("Breakfast recommendations: ");
      for( let i = 1; i<B.length; i++)
      {
        breakfast.push(B[i]);
      }
      dinner.push("Dinner recommendations: ");
      for( let i = 1; i<D.length-1; i++)
      {
        dinner.push(D[i]);
      }
      for( let i = 1; i<W.length-1; i++)
      {
        workout.push(W[i]);
      }
      for(let i=0;i<dinner.length-1;i++)
      {
        breakfast.push(dinner[i]);
      }
      setDinner(dinner);
      setBreakfast(breakfast);
      setWorkout(workout);
      //console.log(response_data);
    } catch (error){
      console.log(error);
    }
  }
  const handleSubmission = () => {
    setSubmitted(true);
    getDietW();
  };

  const handleDietClick = (message) => {
    setShowMessage(true);
    setMessageContent(message);
  };

  const handleWorkoutClick = (message) => {
    setShowMessage(true);
    setMessageContent(message);
  };
  const handleCloseMessage = () => {
    setShowMessage(false);
    setMessageContent('');
  };

  return (
    <div className="flex flex-col items-center justify-center mt-12 h-full ">
      <div className="text-3xl font-semibold  mb-12 ">
        <h1>Welcome to the AI training arena</h1>
        <h1></h1>
      </div>
      <div className="grid grid-cols-2 gap-10 w-[850px] h-[500px]">
        <div className="flex flex-col items-center">
          <h1 className="text-xl text-lightBlue mb-2 font-semibold">Enter your age</h1>
          <input className="px-2 py-2 border-2 border-lightBlue rounded-lg w-[350px]" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-xl text-lightBlue mb-3 font-semibold">Enter your weight</h1>
          <input className="px-2 py-2 border-2 border-lightBlue rounded-lg w-[350px]" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-xl text-lightBlue mb-2 font-semibold">Enter your gender</h1>
          <input className="px-2 py-2 border-2 border-lightBlue rounded-lg w-[350px]" value={gender} onChange={(e) => setGender(e.target.value)} />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-xl text-lightBlue mb-2 font-semibold">Enter your height</h1>
          <input className="px-2 py-2 border-2 border-lightBlue rounded-lg w-[350px]" value={height} onChange={(e) => setHeight(e.target.value)} />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-xl text-lightBlue mb-2 font-semibold">Are you non veg or non-veg</h1>
          <input className="px-2 py-2 border-2 border-lightBlue rounded-lg w-[350px]" value={dietType} onChange={(e) => setDietType(e.target.value)} />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-xl text-lightBlue mb-2 font-semibold">Do you have any disabilities?</h1>
          <input className="px-2 py-2 border-2 border-lightBlue rounded-lg w-[350px]" value={disabilities} onChange={(e) => setDisabilities(e.target.value)} />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-xl text-lightBlue mb-2 font-semibold">Mention your diseases, if any</h1>
          <input className="px-2 py-2 border-2 border-lightBlue rounded-lg w-[350px]" value={diseases} onChange={(e) => setDiseases(e.target.value)} />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-xl text-lightBlue mb-2 font-semibold">Enter the name of city</h1>
          <input className="px-2 py-2 border-2 border-lightBlue rounded-lg w-[350px]" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="flex flex-col items-center">
          <button className="px-2 py-2 border-2 bg-lightBlue rounded-lg w-[350px] shadow-lg shadow-gray-400 text-white font-semibold text-xl mt-4" onClick={() =>{handleWorkoutClick(Workout)}} disabled={!submitted}>Workout</button>
        </div>
        <div className="flex flex-col items-center">
          <button className="px-2 py-2 border-2 bg-lightBlue rounded-lg w-[350px] shadow-lg shadow-gray-400 text-white font-semibold text-xl mt-4" onClick={() => {handleDietClick(Breakfast)}} disabled={!submitted}>Diet</button>
        </div>   
      </div>
      <div>
        <button className="text-white bg-lightBlue px-16 py-2 rounded-lg shadow-lg shadow-gray-400 font-semibold text-xl mt-24 mb-8" onClick={handleSubmission}>Submit</button>
      </div>
      {showMessage && <MessageCard message={messageContent} onClose={() =>{handleCloseMessage();}} />}
    </div>
  );
}
