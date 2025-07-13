import React from 'react';

function Homepagemedical() {
  return (
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
      <div className="z-10 shadow-2xl flex justify-center items-center border-2 w-[90%] sm:w-[80%] md:w-[65%] lg:w-[60%] h-auto sm:h-[60%] py-6 rounded-[15px] px-6 sm:px-10 border-[#0095DA] bg-white/90 backdrop-blur-lg">
        <div className="flex flex-col items-center gap-6 w-full">
          <input
            type="text"
            className="p-3 w-full sm:w-[80%] bg-[#F8FDFF] border rounded-[15px] border-[#0095DA] outline-none text-sm sm:text-base"
            placeholder="Enter Patient ID"
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
  );
}

export default Homepagemedical;
