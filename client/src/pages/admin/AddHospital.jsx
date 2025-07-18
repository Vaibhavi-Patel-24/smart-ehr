import React from 'react'
import doctor from '../../assets/doctor.jpg'
import LeftPanel from '../../components/admin/LeftPanel.admin'
import InputCardHospital from '../../components/admin/InputCardHospital.admin'

const AddHospital = () => {
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

        <div className="w-full flex items-center flex-col gap-4 pt-24">
          <div className="w-full px-4 md:px-4 lg:px-36">
            <p className="text-white font-semibold">Add Hospital</p>
          </div>
          <InputCardHospital />
        </div>
      </div>
    </div>
  )
}

export default AddHospital
