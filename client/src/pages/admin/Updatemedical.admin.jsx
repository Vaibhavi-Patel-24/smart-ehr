import React from 'react'
import doctor from '../../assets/doctor.jpg'
import LeftPanel from '../../components/admin/LeftPanel.admin'
const Updatemedical = () => {
  return (
   <>
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
    
    
        <div className='w-full flex items-center flex-col gap-4 pt-40'>
           <div className="z-10 shadow-2xl flex justify-center items-center border-2 w-[90%] sm:w-[80%] md:w-[65%] lg:w-[60%] h-auto sm:h-[60%] py-6 rounded-[15px] px-6 sm:px-10 border-[#0095DA] bg-white/90 backdrop-blur-lg">
              <div className="flex flex-col items-center gap-6 w-full">
                <input
                  type="text"
                  className="p-3 w-full sm:w-[80%] bg-[#F8FDFF] border rounded-[15px] border-[#0095DA] outline-none text-sm sm:text-base"
                  placeholder="Enter Medical ID"
                />

                <div className="text-[#0095DA] text-center text-sm">
                  <p>OR</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:justify-center">
                  <button className="btn btn-outline text-sm sm:text-base text-[#0095DA] outline-[#69A4DC] rounded-[15px] px-4 py-2">
                    Scan Fingerprint
                  </button>
                  <button className="btn btn-outline text-sm sm:text-base text-[#0095DA] outline-[#69A4DC] rounded-[15px] px-4 py-2">
                    Scan QR Code
                  </button>
                </div>
              </div>
            </div>
        </div>

     </div>
    </div>
   </>
  );
}

export default Updatemedical
