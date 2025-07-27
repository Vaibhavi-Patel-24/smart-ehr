import React, { useState, useRef } from 'react';
import QrScanner from 'qr-scanner';
import doctor from '../../assets/doctor.jpg';
import LeftPanel from '../../components/admin/LeftPanel.admin';
import { API } from '../../service/api';

const Updatepatient = () => {
  const [patientId, setPatientId] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const scannerRef = useRef(null);

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

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const result = await QrScanner.scanImage(file, { returnDetailedScanResult: true });
      if (result) {
        setPatientId(result.data);
        // This simulates the Enter key press after setting the patientId from QR
        // We need to ensure the state update is processed before calling handleKeyDown
        setTimeout(() => {
          const mockEvent = { key: 'Enter' };
          handleKeyDown(mockEvent);
        }, 0);
      } else {
        alert("No valid QR code found in the image.");
      }
    } catch (err) {
      alert("Failed to read QR code from image.");
      console.error(err);
    }
  };


  const startCameraScanner = () => {
    setCameraOpen(true);
    scannerRef.current = new QrScanner(
      videoRef.current,
      (result) => {
        scannerRef.current.stop();
        setCameraOpen(false);
        setPatientId(result.data);
        setTimeout(() => {
          const mockEvent = { key: 'Enter' };
          handleKeyDown(mockEvent);
        }, 0);
      },
      {
        highlightScanRegion: true,
        returnDetailedScanResult: true,
      }
    );
    scannerRef.current.start();
  };

  const stopCameraScanner = () => {
    scannerRef.current?.stop();
    setCameraOpen(false);
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
        setPatientId('');
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
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${doctor})` }} />
        <div className="absolute inset-0 bg-black opacity-40" />

        <div className="absolute inset-0 flex">
          {/* Left Panel */}
          <div className="hidden lg:block lg:w-60 lg:flex-shrink-0">
            <LeftPanel />
          </div>

          {/* Right Content Area Wrapper */}
          <div className="relative flex-1 h-full overflow-y-auto">
            {/* Show search form only when patient form is not visible */}
            {!showForm && (
              <div className="w-full flex items-center justify-center min-h-full p-4">
                <div className="z-10 shadow-2xl flex flex-col items-center gap-6 w-full max-w-2xl py-6 rounded-[15px] px-6 sm:px-10 border-[#0095DA] bg-white/90 backdrop-blur-lg">
                  <input
                    type="text"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="p-3 w-full sm:w-[80%] bg-[#F8FDFF] border rounded-[15px] border-[#0095DA] outline-none text-sm sm:text-base"
                    placeholder="Enter Patient ID"
                  />
                  <div className="text-[#0095DA] text-center text-sm">OR</div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:justify-center">
                    <button className="btn btn-outline text-sm sm:text-base text-[#0095DA] outline-[#69A4DC] rounded-[15px] px-4 py-2">
                      Scan Fingerprint
                    </button>
                    <button
                      className="btn btn-outline text-sm sm:text-base text-[#0095DA] outline-[#69A4DC] rounded-[15px] px-4 py-2"
                      onClick={startCameraScanner}
                    >
                      Use Camera to Scan
                    </button>
                    <button
                      className="btn btn-outline text-sm sm:text-base text-[#0095DA] outline-[#69A4DC] rounded-[15px] px-4 py-2"
                      onClick={() => fileInputRef.current.click()}
                    >
                      Upload QR Image
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Modal for Patient Details */}
            {showForm && (
              <div className="absolute inset-0 z-20 bg-black/50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-xl border border-[#0095DA] p-6 w-full max-w-6xl mt-9 max-h-[82vh] overflow-y-auto">
                  <h2 className="text-xl font-bold text-[#0095DA] mb-4 text-center">
                    Update Patient Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {['firstName', 'middleName', 'lastName', 'email', 'contact', 'address', 'gender', 'bloodGroup', 'fingerPrint', 'retinaScan'].map((field) => (
                      <input
                        key={field}
                        type="text"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        placeholder={field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
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

                    <h3 className="md:col-span-2 lg:col-span-3 font-semibold text-[#0095DA] mt-4">Admission Info</h3>
                    {Object.entries(formData.admission).map(([key, value]) => (
                      <input
                        key={key}
                        type={key.includes('time') ? 'datetime-local' : 'text'}
                        name={key}
                        value={key.includes('time') && value ? new Date(value).toISOString().slice(0, 16) : value}
                        onChange={(e) => handleNestedChange(e, 'admission')}
                        placeholder={key.replace('_', ' ').replace(/^./, (str) => str.toUpperCase())}
                        className="border p-2 rounded-md"
                      />
                    ))}

                    <h3 className="md:col-span-2 lg:col-span-3 font-semibold text-[#0095DA] mt-4">Medication</h3>
                    {formData.medications && formData.medications.length > 0 && Object.entries(formData.medications[0]).map(([key, value]) => (
                      <input
                        key={key}
                        type={key.includes('date') ? 'date' : 'text'}
                        value={key.includes('date') && value ? new Date(value).toISOString().slice(0, 10) : value}
                        onChange={(e) => handleNestedChange(e, 'medications', 0, key)}
                        placeholder={key.replace('_', ' ').replace(/^./, (str) => str.toUpperCase())}
                        className="border p-2 rounded-md"
                      />
                    ))}

                    {/* Additional sections like Vitals, Notes, etc. follow the same pattern */}
                    
                  </div>

                  <div className="flex justify-between mt-6">
                    <button onClick={handleUpdate} className="bg-[#0095DA] text-white px-6 py-2 rounded-lg">
                      Update
                    </button>
                    <button onClick={() => setShowForm(false)} className="border border-[#0095DA] text-[#0095DA] px-6 py-2 rounded-lg">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {cameraOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
          <video ref={videoRef} className="w-[300px] h-[300px] rounded" />
          <button onClick={stopCameraScanner} className="mt-4 bg-red-600 text-white px-6 py-2 rounded">
            Cancel
          </button>
        </div>
      )}
    </>
  );
};

export default Updatepatient;