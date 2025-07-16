import React, { useEffect, useState } from 'react'
import sos from '../../assets/sos.png'
import EhrContainer from '../../components/EhrContainer'
import { data } from '../../data/ehr';
import Navbar from '../../components/Navbar';
import { useParams } from 'react-router-dom';
import { API } from '../../service/api';
import { usePatient } from '../../context/PatientContextProvider';

const HomepagePatient = () => {
    const [ehr, setEhr] = useState({});
    const [editMode, setEditMode] = useState(false);
    const { patientId } = usePatient() || sessionStorage.getItem("patientId");
    console.log(patientId)
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
        </div>
      </div>
      
    </div>
      
    </>
  )
}

export default HomepagePatient
