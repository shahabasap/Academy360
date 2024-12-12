import { useState } from 'react';
import { FaUser, FaSignOutAlt, FaBell, FaCalendarPlus, FaDoorOpen, FaUserCheck } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';

const Navbar = () => {
  const[showSelecBox,setSelectBox]=useState(false)
  return (
    <div>
       <div className="sticky top-0 flex flex-row justify-between items-center h-16 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-7 z-10 sm:px-20 md:py-8 lg:py-10 shadow-lg">
      <div className="flex items-center">
        <img
          className="h-12 w-12 md:h-16 md:w-16"
          src="/src/assets/logo.png"
          alt="Academy-360-logo"
        />
        <div className="flex flex-col ml-4">
          <h1 className="text-white text-base sm:text-sm md:text-lg font-extrabold tracking-wide">
            ACADEMY 360
          </h1>
          <h3 className="text-white sm:text-[15px] text-sm md:text-base font-light tracking-wide">
            Empowering Education
          </h3>
        </div>
      </div>

      <div className="flex flex-row items-center space-x-4 md:space-x-6">
        <FaBell className="text-white w-6 h-auto cursor-pointer hover:text-yellow-300 transition-transform duration-300 transform hover:scale-110 ease-in-out" />
        <FaUserCheck className="text-white w-6 h-auto cursor-pointer hover:text-green-300 transition-transform duration-300 transform hover:scale-110 ease-in-out" />

    

        <div className="relative">
          <span
            className="w-11 h-11 border border-white border-opacity-30 rounded-full flex justify-center items-center text-[#2E236C] cursor-pointer bg-white hover:bg-gray-200 transition-colors duration-300 ease-in-out"
          >
            <span className="font-bold text-lg" 
            onClick={()=>setSelectBox(!showSelecBox)}
            >N</span>
          </span>
          {showSelecBox && <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl">
            <button className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-purple-600 transition-colors duration-300 ease-in-out">
              <FaUser className="text-purple-600 opacity-80 font-medium mr-3" />
              Profile
            </button>
            <button className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors duration-300 ease-in-out">
              <FaCalendarPlus className="text-green-600 opacity-80 font-medium mr-3" />
              Video Schedules
            </button>
            <button className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-300 ease-in-out">
              <FaDoorOpen className="text-blue-600 opacity-80 font-medium mr-3" />
              Leave Classroom
            </button>
            <button className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors duration-300 ease-in-out">
              <FaSignOutAlt className="text-red-600 opacity-80 font-medium mr-3" />
              Logout
            </button>
          </div>}
          
        </div>
      </div>
    </div>
    <Outlet />
    </div>
   
  );
};

export default Navbar;
