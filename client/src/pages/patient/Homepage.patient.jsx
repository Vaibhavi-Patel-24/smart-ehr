import React from 'react'
import sos from '../../assets/sos.png'
import EhrContainer from '../../components/EhrContainer'
import { data } from '../../data/ehr';
import Navbar from '../../components/Navbar';

const HomepagePatient = () => {
  return (
    <>

    <div className="min-h-screen bg-white">


      {/* Push content down below fixed nav */}
      <div className="pt-10 pb-10 px-4 flex flex-col items-center text-center space-y-6">
        <p className="text-md font-semibold text-[rgb(255,143,154)] max-w-md pt-6">
          Don’t wait. If this is a health crisis, tap the SOS button now
        </p>

        <img src={sos} alt="sos" className="w-24 h-auto pt-2" />

        <p className="text-md font-semibold text-[rgb(255,143,154)]">EMERGENCY</p>

        <div className="w-full max-w-3xl">
          <EhrContainer data={data} />
        </div>
      </div>
    </div>
      
    </>
  )
}

export default HomepagePatient
