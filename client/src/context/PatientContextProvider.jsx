import React, { createContext, useContext, useState, useEffect } from 'react';

const PatientContext = createContext();

export const usePatient = () => useContext(PatientContext);

export const PatientProvider = ({ children }) => {
  const [patientId, setPatientId] = useState(null);

  // Restore from sessionStorage on page refresh
  useEffect(() => {
    const storedId = sessionStorage.getItem("patientId");
    if (storedId) setPatientId(storedId);
  }, []);

  // Store safely in state + session
  const updatePatientId = (id) => {
    if (id) {
      setPatientId(id);
      sessionStorage.setItem("patientId", id);
    }
  };

  // Optional: Clear patient ID on logout
  const clearPatientId = () => {
    setPatientId(null);
    sessionStorage.removeItem("patientId");
  };

  return (
    <PatientContext.Provider value={{ patientId, setPatientId: updatePatientId, clearPatientId }}>
      {children}
    </PatientContext.Provider>
  );
};
