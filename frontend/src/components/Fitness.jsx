import React from 'react';
import { Link } from 'react-router-dom'; 
import Calories from '../Images/calories.png';
import Trainner from '../Images/trainner.png';
import Posture from '../Images/posture.png';

export default function Fitness() {
  const fit_tiles = [
    {
        url : Trainner,
        name : '<p>Connect with a</p><p>trainer</p>',
        route: '/connect-trainer',
        ind : '1'
    },
    {
        url : Calories,
        name : '<p>Count your</p> <p>calories</p>',
        route: '/fitness/countcal',
        ind : '2'
    },
    {
        url : Posture,
        name : '<p>Correct your</p> <p>posture</p>',
        route: '/fitness/posture',
        ind : '3'
    }
  ];
  return (
    <div className="h-full py-4">
        <div className=" w-screen flex flex-col items-center">
            <div>
            <div className=" text-3xl mt-[100px] mb-[60px] font-semibold">
                <h1>Welcome to the</h1>
                <h1>Fitness center</h1>
            </div>
            <div className="grid grid-cols-3 gap-4 w-[615px]">
                {fit_tiles.map((tile) => (
                    <Link key={tile.ind} to={tile.route}> {/* Use Link component and set 'to' prop to the route */}
                      <div className="bg-cover w-full h-80 flex justify-center hover:scale-105 duration-200" style={{backgroundImage: `url(${tile.url})`}}>
                        <div className="text-xl text-white mt-48 font-semibold ">
                          <div className="flex flex-col justify-center items-center" dangerouslySetInnerHTML={{ __html: tile.name }} />
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
