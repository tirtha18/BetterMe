import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Images/logo.png';
const navigationLinksp = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'AI Coach', path: '/aicoach' },
  { name: 'Fitness', path: '/fitness' },
  { name: 'Appointments', path: '/doctors' },
  { name: 'Daily Feed', path: '/community' },
  { name: 'Dashboard', path: '/dashboard' },
];
const navigationLinksd =[
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Community', path: '/community' },
  { name: 'DashBoard', path: '/dashboardd' },
];
export default function NavBar() {
  return (
    <div className="flex justify-between flex-row items-center">
      <div className="flex flex-row items-center font-semibold">
        <div className="h-16 w-16 mr-5 hidden sm:flex"><img src={Logo} alt="cds" /></div>
        <ul className="flex space-x-4">
          {navigationLinksp.map((link) => (
            <li key={link.name} className="hover:scale-105">
              <Link to={link.path} className="hover:text-lightBlue"> 
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Link to ='/login'>
        <button className="mr-4 rounded-lg bg-teal-500 text-white px-[36px] py-[5px] font-semibold hover:scale-105 duration-150">
          Login
        </button>
        </Link>
        <Link to = '/register'>
        <button className="mr-4 rounded-lg bg-teal-500 text-white px-[32px] py-[5px] font-semibold hover:scale-105 duration-150">
          Register
        </button>
        </Link>
      </div>
    </div>
  );
}
