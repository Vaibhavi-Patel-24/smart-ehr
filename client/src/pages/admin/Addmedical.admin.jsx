import React from 'react'
import doctor from '../../assets/doctor.jpg'
import LeftPanel from '../../components/admin/LeftPanel.admin'
import InputCardMedical
 from '../../components/admin/InputCard.medical.admin'
const Addmedical = () => {
  return (
    <>
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
    
    
        <div className='w-full flex items-center flex-col gap-4 pt-25'>
        <div className="w-full px-36">
            <p className="text-white font-semibold">New Medical</p>
        </div>            
        <InputCardMedical/> 
        </div>

     </div>
    </div>
    </>
  )
}

export default Addmedical
