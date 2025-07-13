import React from 'react';
import EhrContainer from '../../components/EhrContainer';
import { data } from '../../data/ehr';
import Analysismedical from '../../components/medical/Analysis.medical';

function Ehrmedical() {
  return (
    <div className="relative mt-10 mb-10 flex flex-col gap-8 items-center">
      {/* Main components */}
      <EhrContainer data={data} />
      <Analysismedical />

      {/* Decorative Background SVGs */}
      <img
        src="/nurseimage2.svg"
        alt="Nurse Bottom Left"
        className="absolute bottom-0 left-0 w-[100px] sm:block hidden md:w-[180px] lg:w-[260px] xl:w-[300px] pointer-events-none select-none z-0"
      />
      <img
        src="/hospitalimage.svg"
        alt="Hospital Top Right"
        className="absolute top-0 right-0 w-[100px] sm:block hidden md:w-[180px] lg:w-[260px] xl:w-[300px] pointer-events-none select-none z-0"
      />
      <img
        src="/drimage2.svg"
        alt="Doctor Bottom Right"
        className="absolute bottom-0 right-0 w-[100px] sm:block hidden md:w-[180px] lg:w-[260px] xl:w-[300px] pointer-events-none select-none z-0"
      />
      <img
        src="/drimage.svg"
        alt="Doctor Top Left"
        className="absolute top-0 left-0 w-[100px] sm:block hidden md:w-[180px] lg:w-[260px] xl:w-[300px] pointer-events-none select-none z-0"
      />
    </div>
  );
}

export default Ehrmedical;
