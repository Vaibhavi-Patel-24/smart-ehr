export const SERVICE_URLS={
    fetchAllEhr:{ url:'/patient/allpatients', method:'GET'},
    fetchEhr:{ url:`/patient/:id`, method:'GET'},
    fetchByPatientId: { url: '/patient/by-patientid/:patientId', method: 'GET' },
    updateByMedical: { url: '/medical/patients/:patientId', method: 'PATCH' },
    loginPatient: {url: '/login/patient',method: 'POST',},
    loginMedical: {url: '/login/medical',method: 'POST',},
    loginAdmin:{url: '/login/admin',method: 'POST'},
    addPatient: { url: '/patient/addpatient', method: 'POST' },
    addMedical: { url: '/medical/addmedical',method: 'POST'},
    deleteMedical: {url: '/medical/deletemedical/:id',method: 'DELETE'},
    deletePatient: {url: '/patient/deletepatient/:id',method: 'DELETE'},
    updateMedicalByAdmin: {url: '/admin/medical/:medicalId', method: 'PATCH',},
    getMedicalById: { url: "/admin/medical/:medicalId", method: "GET"},
    updatePatientbyAdmin: {url: '/admin/patient/:patientId', method: 'PATCH',},
   getPatientById: { url: "/admin/patient/:patientId", method: "GET"},

}



export const API_NOTIFICATION_MESSAGES = {
    loading: {
      title: 'Loading...',
      message: 'Data is being loaded, please wait...',
    },
    success: {
      title: 'Success',
      message: 'Data loaded successfully',
    },
    responseFailure: {
      title: 'Error',
      message: 'An error occurred while fetching response from the server. Please try again.',
    },
    requestFailure: {
      title: 'Error',
      message: 'An error occurred while parsing request data.',
    },
    networkError: {
      title: 'Error',
      message: 'Unable to connect to the server. Please check your network and try again later.',
    },
  };
  