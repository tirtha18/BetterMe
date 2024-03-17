import React from 'react';
import U from '../Images/1.png'
import T from '../Images/2.png'
import V from '../Images/3.png'
import X from '../Images/4.png'
const About = () => {
  return (
    <>
      <div className='aboutbox my-16 mx-10'>

        <p className='text-bold font-poppins font-semibold text-center text-4xl text-gray-600 ml-4 mb-6'>Our Vision</p>
        <div className='flex items-center justify-center'>
          <div className="border-2 border-lightBlue w-3/4 rounded-md font-poppins text-2xl font-semibold p-5 text-lightBlue">
            Our team's vision is to help people achieve their best health. We want to create a future where healthcare is easy to use and personalized for everyone. Through our web app, we aim to provide a one-stop solution for various healthcare needs. We also aim to build a supportive community, changing the way people take care of their health.
          </div>
        </div>
      </div>

      <div className='mt-28'>
        <p className='text-bold font-poppins font-semibold text-center text-4xl text-gray-600 ml-4 mt-24'>Meet the Founders</p>
        <div className="flex justify-evenly mt-6 ml-4">
          <div className="flex flex-col items-center">
            <img src={U} alt="" className='rounded-full h-40 w-40 border-2 border-lightBlue' />
            <span className='block font-semibold font-poppins text-lg mt-2 '>Shreyaan Saha</span>
          </div>
          <div className="flex flex-col items-center">
            <img src={T} alt="" className='rounded-full h-40 w-40 border-2 border-lightBlue' />
            <span className='block font-semibold font-poppins text-lg mt-2'>Udbhas Dutta</span>
          </div>
          <div className="flex flex-col items-center">
            <img src={V} alt="" className='rounded-full h-40 w-40 border-2 border-lightBlue' />
            <span className='block font-semibold font-poppins text-lg mt-2'>Priyobroto Acharya</span>
          </div>
          <div className="flex flex-col items-center">
            <img src={X} alt="" className='rounded-full h-40 w-40 border-2 border-lightBlue' />
            <span className='block font-semibold font-poppins text-lg mt-2'>Tirtha Biswas</span>
          </div>
        </div>
      </div>
      <div className='mt-24'></div>
    </>
  );
};

export default About;
