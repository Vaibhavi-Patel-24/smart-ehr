import { useEffect, useState } from 'react';
import EhrContainer from '../../components/EhrContainer';
import { data } from '../../data/ehr'; // optional fallback
import Analysismedical from '../../components/medical/Analysis.medical';
import { API } from '../../service/api';

function Ehrmedical() {
  const [ehr, setEhr] = useState({});
  const patientId = 'PAT1810556061'; // manually set for testing

  const fetchEhr = async () => {
    try {
      console.log({patientId})
      const response = await API.fetchByPatientId({ patientId }); // ensure this matches API structure
      console.log("API Response:", response?.data);
      setEhr(response?.data);
    } catch (error) {
      console.error('Failed to fetch EHR:', error.response?.data || error.message);
      setEhr(data); // fallback
    }
  };

  useEffect(() => {
    fetchEhr();
  }, []);

  return (
    <div className="relative mt-10 mb-10 flex flex-col gap-8 items-center">
      {/* ✅ Use fetched ehr, not static data */}
      <EhrContainer data={ehr} />
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

      {/* Decorative SVGs */}
      <img src="/nurseimage2.svg" alt="Nurse Bottom Left" className="absolute bottom-0 left-0 w-[100px] sm:block hidden md:w-[180px] lg:w-[260px] xl:w-[300px] pointer-events-none select-none z-0" />
      <img src="/hospitalimage.svg" alt="Hospital Top Right" className="absolute top-0 right-0 w-[100px] sm:block hidden md:w-[180px] lg:w-[260px] xl:w-[300px] pointer-events-none select-none z-0" />
      <img src="/drimage2.svg" alt="Doctor Bottom Right" className="absolute bottom-0 right-0 w-[100px] sm:block hidden md:w-[180px] lg:w-[260px] xl:w-[300px] pointer-events-none select-none z-0" />
      <img src="/drimage.svg" alt="Doctor Top Left" className="absolute top-0 left-0 w-[100px] sm:block hidden md:w-[180px] lg:w-[260px] xl:w-[300px] pointer-events-none select-none z-0" />
    </div>
  );
}

export default Ehrmedical;
