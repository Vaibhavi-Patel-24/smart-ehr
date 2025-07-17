// import React from 'react'
// import doctor from '../../assets/doctor.jpg'
// import LeftPanel from '../../components/admin/LeftPanel.admin'

// const Updatepatient = () => {
//  return (
//   <>
//     <div className="fixed inset-0 overflow-hidden">
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{ backgroundImage: `url(${doctor})` }}
//       />

//       <div className="absolute inset-0 bg-black opacity-40" />

//       <div className="absolute inset-0 flex">
        
//         <div className="lg:w-60 lg:h-full lg:overflow-hidden">
//           <LeftPanel />
//         </div>
    
    
//         <div className='w-full flex items-center flex-col gap-4 pt-40'>
//            <div className="z-10 shadow-2xl flex justify-center items-center border-2 w-[90%] sm:w-[80%] md:w-[65%] lg:w-[60%] h-auto sm:h-[60%] py-6 rounded-[15px] px-6 sm:px-10 border-[#0095DA] bg-white/90 backdrop-blur-lg">
//               <div className="flex flex-col items-center gap-6 w-full">
//                 <input
//                   type="text"
//                   className="p-3 w-full sm:w-[80%] bg-[#F8FDFF] border rounded-[15px] border-[#0095DA] outline-none text-sm sm:text-base"
//                   placeholder="Enter Patient ID"
//                 />

//                 <div className="text-[#0095DA] text-center text-sm">
//                   <p>OR</p>
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-3 w-full sm:justify-center">
//                   <button className="btn btn-outline text-sm sm:text-base text-[#0095DA] outline-[#69A4DC] rounded-[15px] px-4 py-2">
//                     Scan Fingerprint
//                   </button>
//                   <button className="btn btn-outline text-sm sm:text-base text-[#0095DA] outline-[#69A4DC] rounded-[15px] px-4 py-2">
//                     Scan QR Code
//                   </button>
//                 </div>
//               </div>
//             </div>
//         </div>

//      </div>
//     </div>
//   </>
//   );
// }

// export default Updatepatient


import React, { useState } from 'react';
import doctor from '../../assets/doctor.jpg';
import LeftPanel from '../../components/admin/LeftPanel.admin';
import { API } from '../../service/api';

const Updatepatient = () => {
  const [patientId, setPatientId] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    contact: '',
    address: '',
    gender: '',
    bloodGroup: '',
    dob: '',
    // password: '',
    fingerPrint: '',
    retinaScan: '',
    admission: {
      admission_id: '',
      admission_time: '',
      location: '',
      reason: ''
    },
    medications: [
      {
        name: '',
        dose: '',
        frequency: '',
        start_date: '',
        end_date: ''
      }
    ],
    vitals: [
      {
        type: '',
        value: '',
        timestamp: ''
      }
    ],
    notes: [
      {
        author: '',
        timestamp: '',
        content: ''
      }
    ],
    symptoms: [''],
    procedures: [''],
    emergencyContact: ['']
  });

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && patientId) {
      try {
        const res = await API.getPatientById({ patientId });
        if (res.isSuccess) {
          setFormData(res.data.patient);
          setShowForm(true);
        } else {
          alert('Patient ID not found');
        }
      } catch (err) {
        console.error(err);
        alert('Failed to fetch patient data');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (e, section, index = null, field = null) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev };
      if (index !== null && field !== null) {
        updated[section][index][field] = value;
      } else {
        updated[section][name] = value;
      }
      return updated;
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await API.updatePatientbyAdmin({ ...formData, patientId });
      if (res.isSuccess) {
        alert('Patient updated successfully');
        setShowForm(false);
      } else {
        alert('Update failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error while updating');
    }
  };

  return (
    <>
      <div className="fixed inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${doctor})` }}
        />
        <div className="absolute inset-0 bg-black opacity-40" />

        <div className="absolute inset-0 flex">
          <div className="lg:w-60 lg:h-full lg:overflow-hidden">
            <LeftPanel />
          </div>

          <div className="w-full flex items-center flex-col gap-4 pt-40">
            <div className="z-10 shadow-2xl flex justify-center items-center border-2 w-[90%] sm:w-[80%] md:w-[65%] lg:w-[60%] h-auto sm:h-[60%] py-6 rounded-[15px] px-6 sm:px-10 border-[#0095DA] bg-white/90 backdrop-blur-lg">
              <div className="flex flex-col items-center gap-6 w-full">
                <input
                  type="text"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  onKeyDown={handleKeyDown}
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

          {showForm && (
            <div className="z-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl border border-[#0095DA] p-6 w-[90%] sm:w-[80%] h-[90vh] overflow-y-scroll">
              <h2 className="text-xl font-bold text-[#0095DA] mb-4 text-center">
                Update Patient Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['firstName', 'middleName', 'lastName', 'email', 'contact', 'address', 'gender', 'bloodGroup', 'fingerPrint', 'retinaScan', 'password'].map((field) => (
                  <input
                    key={field}
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={field}
                    className="border p-2 rounded-md"
                  />
                ))}
                <input
                  type="date"
                  name="dob"
                  value={formData.dob?.substring(0, 10)}
                  onChange={handleChange}
                  className="border p-2 rounded-md"
                  placeholder="DOB"
                />

                {/* Admission Section */}
                <h3 className="col-span-2 font-semibold text-[#0095DA] mt-4">Admission Info</h3>
                {Object.entries(formData.admission).map(([key, value]) => (
                  <input
                    key={key}
                    type={key.includes('time') ? 'datetime-local' : 'text'}
                    name={key}
                    value={
                      key.includes('time')
                        ? new Date(value).toISOString().slice(0, 16)
                        : value
                    }
                    onChange={(e) => handleNestedChange(e, 'admission')}
                    placeholder={key}
                    className="border p-2 rounded-md"
                  />
                ))}

                {/* Medication (first one only) */}
                <h3 className="col-span-2 font-semibold text-[#0095DA] mt-4">Medication</h3>
                {Object.entries(formData.medications[0]).map(([key, value]) => (
                  <input
                    key={key}
                    type={key.includes('date') ? 'date' : 'text'}
                    value={
                      key.includes('date') && value
                        ? new Date(value).toISOString().slice(0, 10)
                        : value
                    }
                    onChange={(e) =>
                      handleNestedChange(e, 'medications', 0, key)
                    }
                    placeholder={key}
                    className="border p-2 rounded-md"
                  />
                ))}

                {/* Vitals (first one only) */}
                <h3 className="col-span-2 font-semibold text-[#0095DA] mt-4">Vitals</h3>
                {Object.entries(formData.vitals[0]).map(([key, value]) => (
                  <input
                    key={key}
                    type={key === 'timestamp' ? 'datetime-local' : 'text'}
                    value={
                      key === 'timestamp' && value
                        ? new Date(value).toISOString().slice(0, 16)
                        : value
                    }
                    onChange={(e) =>
                      handleNestedChange(e, 'vitals', 0, key)
                    }
                    placeholder={key}
                    className="border p-2 rounded-md"
                  />
                ))}

                {/* Notes (first one only) */}
                <h3 className="col-span-2 font-semibold text-[#0095DA] mt-4">Notes</h3>
                {Object.entries(formData.notes[0]).map(([key, value]) => (
                  <input
                    key={key}
                    type={key === 'timestamp' ? 'datetime-local' : 'text'}
                    value={
                      key === 'timestamp' && value
                        ? new Date(value).toISOString().slice(0, 16)
                        : value
                    }
                    onChange={(e) =>
                      handleNestedChange(e, 'notes', 0, key)
                    }
                    placeholder={key}
                    className="border p-2 rounded-md"
                  />
                ))}

                {/* Arrays (first only shown) */}
                {['symptoms', 'procedures', 'emergencyContact'].map((arr) => (
                  <input
                    key={arr}
                    type="text"
                    value={formData[arr]?.[0] || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        [arr]: [val],
                      }));
                    }}
                    placeholder={arr}
                    className="border p-2 rounded-md"
                  />
                ))}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={handleUpdate}
                  className="bg-[#0095DA] text-white px-6 py-2 rounded-lg"
                >
                  Update
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="border border-[#0095DA] text-[#0095DA] px-6 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Updatepatient;

