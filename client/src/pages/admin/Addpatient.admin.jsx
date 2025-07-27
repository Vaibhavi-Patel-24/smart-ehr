import React from 'react'
import doctor from '../../assets/doctor.jpg'
import LeftPanel from '../../components/admin/LeftPanel.admin'
import InputCard from '../../components/admin/InputCard.patient.admin'

const Addpatient= () => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${doctor})` }}
      />

      <div className="absolute inset-0 bg-black opacity-40" />

      <div className="absolute inset-0 flex">
        
        <div className="lg:w-60 lg:h-full lg:overflow-hidden">
          <LeftPanel />
        </div>
    
    
        <div className='w-full flex items-center flex-col gap-4 pt-25'>
        <div className="w-full px-4 md:px-4 lg:px-36">
            <p className="text-white font-semibold">New Patient</p>
        </div>            
        <InputCard/>
        </div>

     </div>
    </div>
  )
}

export default Addpatient
