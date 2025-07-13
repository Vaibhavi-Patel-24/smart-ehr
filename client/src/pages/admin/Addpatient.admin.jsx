import React from 'react'
import doctor from '../../assets/doctor.jpg'
import LeftPanel from '../../components/admin/LeftPanel.admin'

const Addpatient= () => {
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
    
        <div className='w-full flex items-center flex-col gap-4 pt-25'>
            <p className='text-white font-semibold ali'> New Patient</p>
            <div className='bg-[rgb(182,177,177)] w-[750px] h-[400px] rounded-xl opacity-80 flex flex-col justify-center items-center pl-3 pr-3 gap-4'>
            <div className='flex flex-row gap-4'>
                <input
                type="text"
                placeholder="First Name"
                className="bg-transparent border-b-2 border-black text-black font-semibold px-2 py-1 focus:outline-none"
                />
                <input
                type="text"
                placeholder="Middle Name"
                className="bg-transparent border-b-2 border-black text-black font-semibold px-2 py-1 focus:outline-none"
                />
                <input
                type="text"
                placeholder="Last Name"
                className="bg-transparent border-b-2 border-black text-black font-semibold px-2 py-1 focus:outline-none"
                />
            </div>

             <div className='flex flex-row gap-4'>
                <input
                type="date"
                placeholder="dd-mm-yyyy"
                className="bg-transparent border-b-2 border-black text-black font-semibold px-2 py-1 focus:outline-none "
                />
                <input
                type="text"
                placeholder="Blood Group"
                className="bg-transparent border-b-2 border-black text-black font-semibold px-2 py-1 focus:outline-none"
                />
                <input
                type="text"
                placeholder="Gender"
                className="bg-transparent border-b-2 border-black text-black font-semibold px-2 py-1 focus:outline-none"
                />
            </div>
             <div className='flex flex-row gap-4'>
                <input
                type="text"
                placeholder="Address"
                className="bg-transparent border-b-2 border-black text-black font-semibold px-2 py-1 focus:outline-none"
                />
                <input
                type="text"
                placeholder="Admissions"
                className="bg-transparent border-b-2 border-black text-black font-semibold px-2 py-1 focus:outline-none"
                />
                <input
                type="text"
                placeholder="Labs"
                className="bg-transparent border-b-2 border-black text-black font-semibold px-2 py-1 focus:outline-none"
                />
            </div>
             <div className='flex flex-row gap-4'>
                <input
                type="text"
                placeholder="Vitals"
                className="bg-transparent border-b-2 border-black text-black font-semibold px-2 py-1 focus:outline-none"
                />
                <input
                type="text"
                placeholder="Symptoms"
                className="bg-transparent border-b-2 border-black text-black font-semibold px-2 py-1 focus:outline-none"
                />
                <input
                type="text"
                placeholder="Medication"
                className="bg-transparent border-b-2 border-black text-black font-semibold px-2 py-1 focus:outline-none"
                />
            </div>
             <div className='flex flex-row gap-4'>
                <input
                type="text"
                placeholder="Procedure"
                className="bg-transparent border-b-2 border-black text-black font-semibold px-2 py-1 focus:outline-none"
                />
                <input
                type="text"
                placeholder="Contact"
                className="bg-transparent border-b-2 border-black text-black font-semibold px-2 py-1 focus:outline-none"
                />
                <input
                type="text"
                placeholder="Emergency Contacts"
                className="bg-transparent border-b-2 border-black text-black font-semibold px-2 py-1 focus:outline-none"
                />
            </div>
             <div className='flex flex-row gap-4'>
                <input
                type="text"
                placeholder="Email"
                className="bg-transparent border-b-2 border-black text-black font-semibold px-2 py-1 focus:outline-none"
                />
                <input
                type="text"
                placeholder="Finger_print_hash^"
                className="bg-transparent border-b-2 border-black text-black font-semibold px-2 py-1 focus:outline-none"
                />
                <input
                type="text"
                placeholder="retina_scan_hash^"
                className="bg-transparent border-b-2 border-black text-black font-semibold px-2 py-1 focus:outline-none"
                />
            </div>

            <button className="btn btn-neutral btn-outline rounded-xl text-[rgb(0,149,218)] border-[rgb(0,149,218)] font-semibold bg-white border-2">Outline</button>

            </div>
        </div>

     </div>
    </div>
  )
}

export default Addpatient
