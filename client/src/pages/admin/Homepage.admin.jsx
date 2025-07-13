import React from 'react'
import LeftPanel from '../../components/admin/LeftPanel.admin'
import doctor from '../../assets/doctor.jpg'
import user_heart from '../../assets/user_heart.png'
import user from '../../assets/user.png'
import right_arrow from '../../assets/right_arrow.png'

function HomepageAdmin() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${doctor})` }}
      />

      <div className="absolute inset-0 bg-black opacity-40" />

      <div className="absolute inset-0 flex">
        <div className="w-60 h-full overflow-hidden">
          <LeftPanel />
        </div>

        <div className="w-full flex items-center justify-center flex-row gap-20">
         
          {/* <div className='bg-[rgb(182,177,177)] w-[200px] h-[200px] rounded-xl flex flex-col pt-2 pb-2 gap-2 opacity-80'>
            <p className='font-bold text-xl text-center'>Manage Patient</p>
            <div className='flex flex-row justify-center items-center pr-4 pl-4'>
              <img src={user} alt=" " className="w-32 h-32 rounded-full" />
              <img src={right_arrow} alt=" " className="w-12 h-12 rounded-full" />
              </div>
          </div> */}

           <div className='bg-[rgb(182,177,177)] w-[200px] h-[200px] rounded-xl flex flex-col pt-2 pb-2 gap-2 opacity-80'>
            <p className='font-bold text-xl text-center'>Manage Patient</p>
            <div className='flex flex-col justify-center items-center pr-4 pl-4 pt-4 pb-4'>
              <div className='flex flex-col gap-3'>
              <p className='font-bold text-[16px] text-[rgb(0,149,218)]'>Add Patient</p>
              <p className='font-bold text-[16px] text-[rgb(0,149,218)]'>Manage Patient</p>
              <p className='font-bold text-[16px] text-[rgb(0,149,218)]'>Remove Patient</p>
              </div>
            </div>
          </div>


          {/* <div className='bg-[rgb(182,177,177)] w-[200px] h-[200px] rounded-xl flex flex-col pt-2 pb-2 gap-2 opacity-80'>
            <p className='font-bold text-xl text-center'>Manage Medical</p>
            <div className='flex flex-row justify-center items-center pl-4 pr-4'>
              <img src={user_heart} alt=" " className="w-32 h-32 rounded-full" />
              <img src={right_arrow} alt=" " className="w-12 h-12 rounded-full" />
              </div>
          </div> */}

          <div className='bg-[rgb(182,177,177)] w-[200px] h-[200px] rounded-xl flex flex-col pt-2 pb-2 gap-2 opacity-80'>
            <p className='font-bold text-xl text-center'>Manage Medical</p>
            <div className='flex flex-col justify-center items-center pr-4 pl-4 pt-4 pb-4'>
              <div className='flex flex-col gap-3'>
              <p className='font-bold text-[16px] text-[rgb(0,149,218)]'>Add Medical</p>
              <p className='font-bold text-[16px] text-[rgb(0,149,218)]'>Manage Medical</p>
              <p className='font-bold text-[16px] text-[rgb(0,149,218)]'>Remove Medical</p>
              </div>
            </div>
          </div>

          <div>
            
          </div>
        </div>

      </div>
    </div>
  )
}

export default HomepageAdmin
