import React from 'react';
import { Link } from 'react-router-dom';
import Dis from '../Images/doctor_img.png';
import Diet from '../Images/diet.jpg';

export default function Aicoach() {
  const fit_tiles = [
    {
      url: Dis,
      name: '<p>Let AI predict</p><p>whether you have</p><p>a disease</p>',
      ind: '1',
      route: '/aicoach/dieseaseprediction', 
    },
    {
      url: Diet,
      name: '<p>Let AI create a</p><p>diet and workout</p><p>plan for you</p>',
      ind: '2',
      route: '/aicoach/diet', 
    },
  ];

  return (
    <div className="h-full py-4">
      <div className="w-screen flex flex-col items-center">
        <div>
          <div className="text-3xl mt-[50px] mb-[60px] font-semibold">
            <h1>Your Your AI Coach</h1>
            <h1>welcomes you</h1>
          </div>
          <div className="grid grid-cols-2 gap-5 w-[615px]">
            {fit_tiles.map((tile, index) => (
              <Link key={index} to={tile.route}>
                <div className="bg-cover w-full h-96 flex justify-center hover:scale-105 duration-200" style={{ backgroundImage: `url(${tile.url})` }}>
                  <div className="text-2xl text-white mt-60 font-semibold ">
                    <div className="flex flex-col justify-center items-center " dangerouslySetInnerHTML={{ __html: tile.name }} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
