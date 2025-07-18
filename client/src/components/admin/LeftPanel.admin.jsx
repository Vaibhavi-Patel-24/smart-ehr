import React, { useState } from 'react';
import doctor_stethoscope from '../../assets/doctor_stethoscope.png';
import patient_profile from '../../assets/patient_profile.png';
import { PiHospitalFill } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react'; // Install this via npm if not already
import right_arrow_black from '../../assets/right_arrow_black.png'
const LeftPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger icon for small/medium screens */}
      {!isOpen && (
     <div className="lg:hidden fixed top-1/2 -translate-y-1/2 left-0 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white text-black px-2 py-4 rounded-r-md shadow-md hover:bg-gray-200 transition"
        >
          <img src={right_arrow_black} alt="Open Sidebar" className="w-4 h-4" />
        </button>
      </div>
        )}


      {/* Sidebar for large screens */}
      <div className="hidden lg:block">
        <div className="lg:w-64 h-screen bg-[rgb(217,217,217)] text-white p-6 fixed top-0 left-0 shadow-lg space-y-6">
          <SidebarContent />
        </div>
      </div>

      {/* Slide-out Sidebar for small/medium screens */}
      {isOpen && (
        <>
          {/* Overlay */}
          {/* Blurred Overlay for mobile */}
          <div
            className="fixed inset-0 backdrop-blur-sm bg-white/10 z-30"
            onClick={() => setIsOpen(false)}
          ></div>


          {/* Sidebar Drawer */}
          <div className="fixed top-0 left-0 w-64 h-screen bg-[rgb(217,217,217)] text-white p-6 shadow-lg z-40">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute bottom-8 right-4 text-black text-2xl font-bold"
            >
              ✕
            </button>
            <SidebarContent />
          </div>
        </>
      )}
    </>
  );
};

// Sidebar links (reusable)
const SidebarContent = () => (
  <>
    <ul className="space-y-3 pt-24">
      <li className="flex items-center gap-2 text-black font-bold text-xl">
        <span>Patient</span>
        <img src={patient_profile} alt="Patient" className="w-6 h-6" />
      </li>
      <Link to="/admin/addpatient">
        <li className="cursor-pointer text-[rgb(0,149,218)] font-semibold">Add Patient</li>
      </Link>
      <Link to="/admin/updatepatient">
        <li className="cursor-pointer text-[rgb(0,149,218)] font-semibold">Manage Patient</li>
      </Link>
      <Link to="/admin/removepatient">
        <li className="cursor-pointer text-[rgb(0,149,218)] font-semibold">Remove Patient</li>
      </Link>
    </ul>

    <ul className="space-y-3 mt-6">
      <li className="flex items-center gap-2 text-black font-bold text-xl">
        <span>Medical</span>
        <img src={doctor_stethoscope} alt="Medical" className="w-6 h-6" />
      </li>
      <Link to="/admin/addmedical">
        <li className="cursor-pointer text-[rgb(0,149,218)] font-semibold">Add Medical</li>
      </Link>
      <Link to="/admin/updatemedical">
        <li className="cursor-pointer text-[rgb(0,149,218)] font-semibold">Manage Medical</li>
      </Link>
      <Link to="/admin/removemedical">
        <li className="cursor-pointer text-[rgb(0,149,218)] font-semibold">Remove Medical</li>
      </Link>
    </ul>
    <ul className="space-y-3 mt-6">
      <li className="flex items-center gap-2 text-black font-bold text-xl">
        <span>Hospital</span>
        <PiHospitalFill alt="Hospital" className='w-6 h-6'/>
        {/* <img src={doctor_stethoscope} alt="Medical" className="w-6 h-6" /> */}
      </li>
      <Link to="/admin/addhospital">
        <li className="cursor-pointer text-[rgb(0,149,218)] font-semibold">Add Hospital</li>
      </Link>
      <Link to="/admin/updatehospital">
        <li className="cursor-pointer text-[rgb(0,149,218)] font-semibold">Manage Hospital</li>
      </Link>
      <Link to="/admin/removehospital">
        <li className="cursor-pointer text-[rgb(0,149,218)] font-semibold">Remove Hospital</li>
      </Link>
    </ul>
  </>
);

export default LeftPanel;
