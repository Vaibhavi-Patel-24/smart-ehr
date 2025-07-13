import React from 'react'
import sos from '../../assets/sos.png'
import EhrContainer from '../../components/EhrContainer'
import { data } from '../../data/ehr';
import Navbar from '../../components/Navbar';

const HomepagePatient = () => {
  return (
    <>
    {/* <div className="absolute h-screen w-full flex justify-center items-center flex-col">
        <p className='text-md font-semibold text-[rgb(255,143,154)]'>Don’t wait. If this is a health crisis, tap the SOS button now</p>
        <img src={sos} alt = " sos " className='pt-10 w-25 h-auto'/>
        <p className='text-md font-semibold text-[rgb(255,143,154)]'>EMERGENCY</p>
        <div>
            <EhrContainer data={data}/>
        </div>
    </div> */}

    <div className="min-h-screen bg-white">
      {/* Use Navbar as-is */}
      <Navbar pos="fixed" />

      {/* Push content down below fixed nav */}
      <div className="pt-20 px-4 flex flex-col items-center text-center space-y-6">
        <p className="text-md font-semibold text-[rgb(255,143,154)] max-w-md">
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
