import React from 'react'
import Home_img from '../Images/home_img.png'

const HomePage = () => {
  return (
    <div>
    <div className="h-screen text-white">
      <div className="w-full h-screen  bg-cover flex flex-col" style={{backgroundImage: `url(${Home_img})`}}>
        <div className="ml-24">
        <div className="text-[38px] font-semibold mt-[380px] mb-12">
          Welcome to BetterMe
        </div>
        <div className="text-7xl font-semibold">
        <div>
          Connecting you
        </div>
        <div>
          With the Best
        </div>
        </div>
        </div>
      </div>
    </div>
    <div className="w-full h-24">  
    </div>
    </div>
  )
}

export default HomePage