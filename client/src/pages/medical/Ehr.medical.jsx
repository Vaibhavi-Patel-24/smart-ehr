import { useEffect, useState } from 'react';
import EhrContainer from '../../components/EhrContainer';
import { data } from '../../data/ehr'; // optional fallback
import Analysismedical from '../../components/medical/Analysis.medical';
import { API } from '../../service/api';
import { useNavigate, useParams } from 'react-router-dom';

function Ehrmedical() {
  const [ehr, setEhr] = useState({});
  const [editMode, setEditMode] = useState(false);
  const { patientId } = useParams();
  const navigate = useNavigate();

  const handleExit = () => navigate(`/medical/home`);

  const fetchEhr = async () => {
    try {
      const response = await API.fetchByPatientId({ patientId });
      setEhr(response?.data);
    } catch (error) {
      console.error('Failed to fetch EHR:', error.response?.data || error.message);
      setEhr(data);
    }
  };

  useEffect(() => {
    fetchEhr();
  }, [patientId]);

const handleSubmit = async (updatedFields) => {
  try {
    console.log('✅ Forwarding data to API...');
    const response = await API.updateByMedical({ patientId, ...updatedFields });
    setEhr(response.data?.patient);
    setEditMode(false);
    alert("EHR updated successfully.");
  } catch (error) {
    console.error("Update failed:", error.response?.data || error.message);
    alert("Failed to update EHR.");
  }
};


  // Listen for payload from container
  useEffect(() => {
    const listener = (e) => {
      const payload = e.detail;
      if (payload) {
        console.log('✅ Payload received from container:', payload);
        handleSubmit(payload);
      }
    };

    window.addEventListener('ehr-submit-payload', listener);
    return () => window.removeEventListener('ehr-submit-payload', listener);
  }, []);

  return (
    <div className="relative mt-10 mb-10 flex flex-col gap-8 items-center">
      <EhrContainer data={ehr} editMode={editMode} setEditMode={setEditMode} />
      <Analysismedical existingSymptoms={ehr?.symptoms || []} />

      <div className="flex flex-col sm:flex-row gap-3 w-full sm:justify-center">
        <button
          className="btn btn-outline text-[#0095DA] outline-[#69A4DC] rounded-[15px] text-sm sm:text-base 
                     w-full sm:w-[200px] h-[44px] sm:h-[48px]"
          onClick={handleExit}
        >
          Exit
        </button>
        <button
          onClick={() => {
            if (editMode) {
              const submitEvent = new Event("ehr-collect-fields");
              window.dispatchEvent(submitEvent);
            } else {
              setEditMode(true);
            }
          }}
          className="btn btn-outline text-[#0095DA] outline-[#69A4DC] rounded-[15px] text-sm sm:text-base 
                     w-full sm:w-[200px] h-[44px] sm:h-[48px]"
        >
          {editMode ? "Submit" : "Update EHR"}
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
