import React from 'react'
import clock from '../../assets/clock.png'
import location_icon from '../../assets/location.png'
import phone_icon from '../../assets/phone.png'
import user_blue from '../../assets/user_blue.png'




const NotificationCard = ({user}) => {

    const { fullName, phone, location, time } = user
  return (
    <>

    <div className="z-10 shadow-2xl flex justify-center items-center border-2 w-[90%] sm:w-[80%] md:w-[65%] lg:w-[60%] h-[45%] lg:h-[15%]  py-6 rounded-[15px] px-6 sm:px-10 border-[#0095DA] bg-white/90 backdrop-blur-lg">
        <div className="flex flex-col items-center gap-4 w-full">
          <div className='flex flex-col lg:flex-row  gap-3 lg:gap-5'>
            <p className='font-bold text-red-600 flex flex-row gap-1'><span><img src={user_blue} alt='Name: ' style={{ width: '20px', height: 'auto' }} /></span><span>{fullName}</span><span className='text-[rgb(0,149,218)] hidden lg:inline'>|</span></p>
            <p className='font-bold text-red-600 flex flex-row gap-1'><span><img src={phone_icon} alt='Mobile No.: 'style={{ width: '20px', height: 'auto' }}/></span><span>{phone}</span><span className='text-[rgb(0,149,218)] hidden lg:inline'>|</span> </p>
            <p className='font-bold text-red-600 flex flex-row gap-1'><span><img src={location_icon} alt='Location: ' style={{ width: '20px', height: 'auto' }}/></span><span>{location}</span><span className='text-[rgb(0,149,218)] hidden lg:inline'>|</span> </p>
            <p className='font-bold text-red-600 flex flex-row gap-1'><span><img src={clock} alt='Time: ' style={{ width: '20px', height: 'auto' }}/></span><span>{time}</span></p>
         </div>
            <p className='font-bold underline text-[rgb(0,149,218)]'>View live location</p>
        </div>
    </div>

    
    </>
  )
}

export default NotificationCard
