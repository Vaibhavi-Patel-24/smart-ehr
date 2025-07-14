import React from 'react'
import NotificationCard from '../../components/medical/NotificationCard.medical'

const patientData = [
  {
    name: 'Riya Mehta',
    phone: '+91 98765 43210',
    location: 'Near AIIMS, Delhi',
    time: '2 mins ago',
  },
  {
    name: 'Amit Sharma',
    phone: '+91 91234 56789',
    location: 'Sector 45, Noida',
    time: '5 mins ago',
  },
  {
    name: 'Amit Sharma',
    phone: '+91 91234 56789',
    location: 'Sector 45, Noida',
    time: '5 mins ago',
  },
  {
    name: 'Amit Sharma',
    phone: '+91 91234 56789',
    location: 'Sector 45, Noida',
    time: '5 mins ago',
  },
  {
    name: 'Amit Sharma',
    phone: '+91 91234 56789',
    location: 'Sector 45, Noida',
    time: '5 mins ago',
  },
  {
    name: 'Amit Sharma',
    phone: '+91 91234 56789',
    location: 'Sector 45, Noida',
    time: '5 mins ago',
  },
  {
    name: 'Amit Sharma',
    phone: '+91 91234 56789',
    location: 'Sector 45, Noida',
    time: '5 mins ago',
  },
  {
    name: 'Amit Sharma',
    phone: '+91 91234 56789',
    location: 'Sector 45, Noida',
    time: '5 mins ago',
  },
]

const Notification = () => {
  return (
    <>
   <div className="relative h-screen w-full flex justify-center items-center overflow-hidden">
      {/* Background Images */}
      <img
        src="/drimage.svg"
        alt="Doctor Left"
        className="absolute top-0 left-0 w-[160px] sm:w-[140px] md:w-[200px] lg:w-[300px] z-0"
      />
      <img
        src="/nurseimage.svg"
        alt="Nurse Bottom Left"
        className="absolute bottom-0 left-0  w-[160px] sm:w-[140px] md:w-[200px] lg:w-[300px] z-0"
      />
      <img
        src="/drimage2.svg"
        alt="Doctor Bottom Right"
        className="absolute bottom-0 right-0  w-[160px] sm:w-[140px] md:w-[200px] lg:w-[300px] z-0"
      />
      <img
        src="/hospitalimage.svg"
        alt="Hospital Top Right"
        className="absolute top-0 right-0  w-[160px] sm:w-[140px] md:w-[200px] lg:w-[300px] z-0"
      />
     
      {/* Form Card */}

      <div className='absolute overflow-y-scroll z-10 inset-0 pt-10 pb-10 flex flex-col w-[100%] items-center gap-5'>
      {patientData.map((user, idx) => (
          <NotificationCard key={idx} user={user} />
      ))}
      </div>

   </div>
    </>
  )
}

export default Notification
