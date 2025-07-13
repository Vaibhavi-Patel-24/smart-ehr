import React from 'react'
import LeftPanel from '../../components/admin/LeftPanel.admin'
import doctor from '../../assets/doctor.jpg'
import user_heart from '../../assets/user_heart.png'
import user from '../../assets/user.png'
import right_arrow from '../../assets/right_arrow.png'
import { useState } from 'react';
import { Link } from 'react-router-dom'

function HomepageAdmin() {

    const [flipCard, setFlipCard] = useState({patient: false, medical: false,});

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${doctor})` }}
      />

      <div className="absolute inset-0 bg-black opacity-40" />

      <div className="absolute inset-0 flex">
        <div className="hidden lg:block w-60 h-full overflow-hidden">
          <LeftPanel />
        </div>

    <div className="fixed inset-0 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${doctor})` }}
      />
      <div className="absolute inset-0 bg-black opacity-40" />

      {/* Foreground content */}
      <div className="absolute inset-0 flex">
        <div className="hidden lg:block w-60 h-full overflow-hidden">
          <LeftPanel />
        </div>

        <div className="w-full flex items-center justify-center flex-col md:flex-row md:gap-20 gap-10 md:pt-0 pt-18">

          {/* Manage Patient Card */}
          <div className="w-[200px] h-[200px] perspective" style={{ perspective: '1000px' }}>
            <div
              className="relative w-full h-full transition-transform duration-700 ease-in-out"
              style={{
                transformStyle: 'preserve-3d',
                transform: flipCard.patient ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
              onClick={() => {
                if (!flipCard.patient) {
                  setFlipCard((prev) => ({ ...prev, patient: true }));
                }
              }}
            >
              {/* Front Side */}
              <div
                className="absolute w-full h-full backface-hidden bg-[rgb(182,177,177)] w-[200px] h-[200px] rounded-xl flex flex-col pt-2 pb-2 gap-2 opacity-80"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <p className="font-bold text-xl text-center">Manage Patient</p>
                <div className="flex flex-row justify-center items-center pr-4 pl-4">
                  <img src={user} alt=" " className="w-32 h-32 rounded-full" />
                  <img src={right_arrow} alt=" " className="w-12 h-12 rounded-full" />
                </div>
              </div>

              {/* Back Side */}
              <div
                className="absolute w-full h-full bg-[rgb(182,177,177)] w-[200px] h-[200px] rounded-xl flex flex-col pt-2 pb-2 gap-2 opacity-80"
                style={{
                  transform: 'rotateY(180deg)',
                  backfaceVisibility: 'hidden',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              >
                <p className="font-bold text-xl text-center">Manage Patient</p>
                <div className="flex flex-col justify-center items-center pr-4 pl-4 pt-4 pb-4">
                  <div className="flex flex-col gap-3">
                    <Link to='/admin/addpatient'>                    
                        <p className="font-bold text-[16px] text-[rgb(0,149,218)]">Add Patient</p>
                    </Link>
                    <Link to='/admin/updatepatient'>
                        <p className="font-bold text-[16px] text-[rgb(0,149,218)]">Manage Patient</p>
                    </Link>
                    <Link to='/admin/removepatient'>
                        <p className="font-bold text-[16px] text-[rgb(0,149,218)]">Remove Patient</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Manage Medical Card */}
          <div className="w-[200px] h-[200px] perspective" style={{ perspective: '1000px' }}>
            <div
              className="relative w-full h-full transition-transform duration-700 ease-in-out"
              style={{
                transformStyle: 'preserve-3d',
                transform: flipCard.medical ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
              onClick={() => {
                if (!flipCard.medical) {
                  setFlipCard((prev) => ({ ...prev, medical: true }));
                }
              }}
            >
              {/* Front Side */}
              <div
                className="absolute w-full h-full backface-hidden bg-[rgb(182,177,177)] w-[200px] h-[200px] rounded-xl flex flex-col pt-2 pb-2 gap-2 opacity-80"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <p className="font-bold text-xl text-center">Manage Medical</p>
                <div className="flex flex-row justify-center items-center pr-4 pl-4">
                  <img src={user_heart} alt=" " className="w-32 h-32 rounded-full" />
                  <img src={right_arrow} alt=" " className="w-12 h-12 rounded-full" />
                </div>
              </div>

              {/* Back Side */}
              <div
                className="absolute w-full h-full bg-[rgb(182,177,177)] w-[200px] h-[200px] rounded-xl flex flex-col pt-2 pb-2 gap-2 opacity-80"
                style={{
                  transform: 'rotateY(180deg)',
                  backfaceVisibility: 'hidden',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              >
                <p className="font-bold text-xl text-center">Manage Medical</p>
                <div className="flex flex-col justify-center items-center pr-4 pl-4 pt-4 pb-4">
                  <div className="flex flex-col gap-3">
                  <Link to='/admin/addmedical'>                    
                    <p className="font-bold text-[16px] text-[rgb(0,149,218)]">Add Medical</p>
                  </Link>
                  <Link to='/admin/updatemedical'>                    
                    <p className="font-bold text-[16px] text-[rgb(0,149,218)]">Manage Medical</p>
                  </Link>
                  <Link to='/admin/removemedical'>                    
                    <p className="font-bold text-[16px] text-[rgb(0,149,218)]">Remove Medical</p>
                  </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

      </div>
    </div>
  )
}

export default HomepageAdmin
