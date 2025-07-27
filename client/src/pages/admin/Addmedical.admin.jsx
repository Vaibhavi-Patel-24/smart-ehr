import React from 'react';
import doctor from '../../assets/doctor.jpg';
import LeftPanel from '../../components/admin/LeftPanel.admin';
import InputCardMedical from '../../components/admin/InputCard.medical.admin';

const Addmedical = () => {
  return (
    <>
      <div className="fixed inset-0 overflow-hidden">
        {/* Background Image and Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${doctor})` }}
        />
        <div className="absolute inset-0 bg-black opacity-40" />

        {/* Main Flex Layout Container */}
        <div className="absolute inset-0 flex">
          
          {/* Left Panel (Sidebar) */}
          <div className="hidden lg:block lg:w-60 lg:flex-shrink-0">
            <LeftPanel />
          </div>
          
          {/* Right Content Area Wrapper */}
          <div className="relative flex-1 h-full overflow-y-auto">
            
            {/* Centering Container for the card */}
            <div className="w-full flex flex-col items-center justify-center min-h-full p-4">
              
              {/* Content Container with a max-width */}
              <div className="w-full max-w-4xl">
                <p className="text-white font-semibold text-2xl mb-4">Add New Medical Record</p>
                <InputCardMedical />
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Addmedical;