import {useEffect} from 'react';
import EhrContainer from '../../components/EhrContainer';
import { data } from '../../data/ehr';
import Analysismedical from '../../components/medical/Analysis.medical';
import { API } from '../../service/api';

const fetchEhr = () =>{
  const response = await API.
}


function Ehrmedical() {
  return (
    <div className="relative mt-10 mb-10 flex flex-col gap-8 items-center">
      {/* Main components */}
      
      <EhrContainer data={data} />
      <Analysismedical />
     <div className="flex flex-col sm:flex-row gap-3 w-full sm:justify-center">
        <button className="btn btn-outline text-[#0095DA] outline-[#69A4DC] rounded-[15px] text-sm sm:text-base 
                            w-full sm:w-[200px] h-[44px] sm:h-[48px]">
        Exit
        </button>
        <button className="btn btn-outline text-[#0095DA] outline-[#69A4DC] rounded-[15px] text-sm sm:text-base 
                            w-full sm:w-[200px] h-[44px] sm:h-[48px]">
        Update EHR
        </button>
        </div>


 
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
