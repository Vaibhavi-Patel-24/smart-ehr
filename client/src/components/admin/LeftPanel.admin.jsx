import React from 'react'
import doctor_stethoscope from '../../assets/doctor_stethoscope.png'
import patient_profile from '../../assets/patient_profile.png'
import { Link } from 'react-router-dom'
const LeftPanel = () => {
  return (
    <div className='hidden lg:block'>
    <div className="w-50 h-screen bg-[rgb(217,217,217)] text-white p-6 fixed top-0 left-0 shadow-lg space-y-6">
      <ul className="space-y-3 pt-28">
        <li className="flex items-center gap-2 cursor-pointer text-black font-bold text-xl">
        <span>Patient</span>
        <img src={patient_profile} alt="" className="w-6 h-6" />
        </li>  
        <Link to='/admin/addpatient'>        
          <li className="cursor-pointer text-[rgb(0,149,218)] font-semibold">Add Patient</li>
        </Link> 
        <Link to='/admin/updatepatient'>
            <li className="cursor-pointer text-[rgb(0,149,218)] font-semibold">Manage Patient</li>
        </Link> 
        <Link to='/admin/removepatient'>
             <li className="cursor-pointer text-[rgb(0,149,218)] font-semibold">Remove Patient</li>
        </Link> 

      </ul>
       <ul className="space-y-3">
        <li className="flex items-center gap-2 cursor-pointer text-black font-bold text-xl">
            <span>Medical</span>
            <img src={doctor_stethoscope} alt="" className="w-6 h-6" />
        </li>
        <Link to='/admin/addmedical'>        
            <li className="cursor-pointer text-[rgb(0,149,218)] font-semibold">Add Medical</li>
        </Link>
        <Link to='/admin/updatemedical'>
            <li className="cursor-pointer text-[rgb(0,149,218)] font-semibold">Manage Medical</li>
        </Link>
        <Link to='/admin/removemedical'>
             <li className="cursor-pointer text-[rgb(0,149,218)] font-semibold">Remove Medical</li>
        </Link>
      </ul>
    </div>
    </div>
  )
}

export default LeftPanel
