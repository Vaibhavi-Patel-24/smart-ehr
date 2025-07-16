import React, { useState } from 'react';
import doctor from '../../assets/doctor.jpg';
import LeftPanel from '../../components/admin/LeftPanel.admin';
import { API } from '../../service/api'; // ✅ Adjust the import path if needed

const Removemedical = () => {
  const [medicalId, setMedicalId] = useState('');

  const handleRemoveClick = async () => {
    if (!medicalId.trim()) {
      alert('Please enter a Medical ID first.');
      return;
    }

    const confirmId = window.prompt(
      'Are you sure you want to delete?\nPlease re-enter the Medical ID to confirm:'
    );

    if (confirmId === null) return;

    if (confirmId === medicalId) {
      try {
        const response = await API.deleteMedical({ id: medicalId });
        if (response?.isSuccess) {
          alert('Medical record deleted successfully.');
          setMedicalId('');
        } else {
          alert('Medical record not found or already deleted.');
        }
      } catch (error) {
        console.error('Error deleting medical record:', error);
        alert('Server error while deleting medical record.');
      }
    } else {
      alert('Medical ID did not match. Deletion cancelled.');
    }
  };

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
        <div className="w-full flex items-center flex-col gap-4 pt-40">
          <div className="z-10 shadow-2xl flex justify-center items-center border-2 w-[90%] sm:w-[80%] md:w-[65%] lg:w-[60%] h-auto sm:h-[60%] py-6 rounded-[15px] px-6 sm:px-10 border-[#0095DA] bg-white/90 backdrop-blur-lg">
            <div className="flex flex-col items-center gap-6 w-full">
              <input
                type="text"
                className="p-3 w-full sm:w-[80%] bg-[#F8FDFF] border rounded-[15px] border-[#0095DA] outline-none text-sm sm:text-base"
                placeholder="Enter Medical ID"
                onChange={(e) => setMedicalId(e.target.value)}
                value={medicalId}
              />
              <button
                onClick={handleRemoveClick}
                className="btn btn-outline text-sm sm:text-base text-[#0095DA] outline-[#69A4DC] rounded-[15px] px-4 py-2"
              >
                Remove Medical
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Removemedical;
