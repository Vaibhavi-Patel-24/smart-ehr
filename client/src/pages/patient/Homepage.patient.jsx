import React, { useEffect, useState } from 'react'
import sos from '../../assets/sos.png'
import EhrContainer from '../../components/EhrContainer'
import { data } from '../../data/ehr';
import Navbar from '../../components/Navbar';
import { API } from '../../service/api';
import { usePatient } from '../../context/PatientContextProvider';




navigator.geolocation.watchPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    console.log('Live Location:', latitude, longitude);
  },
  (error) => console.error('Error getting live location:', error),
  { enableHighAccuracy: true } // <— forces best available method
);


const HomepagePatient = () => {
    const [ehr, setEhr] = useState({});
    const [editMode, setEditMode] = useState(false);
    const context = usePatient();
    const patientId = context?.patientId || sessionStorage.getItem("patientId");
    console.log(patientId)
    
    
    
const handleSubmit = async (updatedFields) => {
  try {
    console.log('✅ Forwarding data to API...');
      console.log("🔁 In handleSubmit patientId:", patientId); // This will now print correctly
    console.log(updatedFields)
    const response = await API.updatePatientSelf({ patientId, ...updatedFields });
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

  return (
    <>

    <div className="min-h-screen bg-white">
      
      <div className="pt-10 pb-10 px-4 flex flex-col items-center text-center space-y-6">
        <p className="text-md font-semibold text-[rgb(255,143,154)] max-w-md pt-6">
          Don’t wait. If this is a health crisis, tap the SOS button now
        </p>

        <img src={sos} alt="sos" className="w-24 h-auto pt-2" />

        <p className="text-md font-semibold text-[rgb(255,143,154)]">EMERGENCY</p>

        <div className="w-full max-w-3xl items-start text-left">
          <EhrContainer data={ehr} editMode={editMode} setEditMode={setEditMode} />
          {/* <img src="/nurseimage2.svg" alt="Nurse Bottom Left" className="absolute bottom-0 left-0 w-[100px] sm:block hidden md:w-[180px] lg:w-[260px] xl:w-[300px] pointer-events-none select-none z-0" />
          <img src="/hospitalimage.svg" alt="Hospital Top Right" className="absolute top-0 right-0 w-[100px] sm:block hidden md:w-[180px] lg:w-[260px] xl:w-[300px] pointer-events-none select-none z-0" />
          <img src="/drimage2.svg" alt="Doctor Bottom Right" className="absolute bottom-0 right-0 w-[100px] sm:block hidden md:w-[180px] lg:w-[260px] xl:w-[300px] pointer-events-none select-none z-0" />
          <img src="/drimage.svg" alt="Doctor Top Left" className="absolute top-0 left-0 w-[100px] sm:block hidden md:w-[180px] lg:w-[260px] xl:w-[300px] pointer-events-none select-none z-0" /> */}
        </div>
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
      
    </div>
      
    </>
  )
}

export default HomepagePatient
