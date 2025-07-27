import React, { useState, useRef } from 'react';
import QrScanner from 'qr-scanner';
import doctor from '../../assets/doctor.jpg';
import LeftPanel from '../../components/admin/LeftPanel.admin';
import { API } from '../../service/api';

// --- Reusable Form Components for Cleanliness ---

/**
 * A styled wrapper for a form section with a title and a responsive grid layout.
 */
const FormSection = ({ title, children, gridCols = 'lg:grid-cols-3' }) => (
  <div className="w-full border-t border-black/20 pt-5 mt-5 first:mt-0 first:border-t-0 first:pt-0">
    <h3 className="text-xl font-bold text-black mb-5">{title}</h3>
    <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-x-8 gap-y-6`}>
      {children}
    </div>
  </div>
);

/**
 * A styled, reusable input field.
 */
const FormField = ({ name, value, onChange, type = 'text', placeholder, required = true }) => (
  <input
    id={name}
    name={name}
    type={type}
    value={value || ''} // Ensure value is not null/undefined
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    className="w-full bg-transparent border-b-2 border-black text-black font-semibold px-2 py-1 focus:outline-none placeholder-gray-700"
  />
);


// --- Main Component ---

const Updatepatient = () => {
  const [patientId, setPatientId] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const scannerRef = useRef(null);

  const [formData, setFormData] = useState({});

  /**
   * Fetches patient data based on the current patientId.
   */
  const handleFetchPatientData = async (id) => {
    if (!id) return;
    try {
      const res = await API.getPatientById({ patientId: id });
      if (res.isSuccess) {
        // Ensure nested arrays/objects have default values to prevent errors
        const patientData = {
            ...res.data.patient,
            admission: res.data.patient.admission || {},
            medications: res.data.patient.medications?.length ? res.data.patient.medications : [{}],
            vitals: res.data.patient.vitals?.length ? res.data.patient.vitals : [{}],
            notes: res.data.patient.notes?.length ? res.data.patient.notes : [{}],
            symptoms: res.data.patient.symptoms || [],
            procedures: res.data.patient.procedures || [],
            emergencyContact: res.data.patient.emergencyContact || [],
        };
        setFormData(patientData);
        setShowForm(true);
      } else {
        alert('Patient ID not found');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to fetch patient data');
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        handleFetchPatientData(patientId);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const result = await QrScanner.scanImage(file, { returnDetailedScanResult: true });
      if (result) {
        setPatientId(result.data);
        handleFetchPatientData(result.data); // Fetch data immediately
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
        handleFetchPatientData(result.data); // Fetch data immediately
      },
      { highlightScanRegion: true, returnDetailedScanResult: true }
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

  const handleNestedChange = (section, field, value) => {
      setFormData(prev => ({
          ...prev,
          [section]: { ...prev[section], [field]: value }
      }));
  };
  
  const handleArrayChange = (arrayName, index, field, value) => {
    const updatedArray = [...(formData[arrayName] || [])]; // Ensure array exists
    updatedArray[index] = { ...updatedArray[index], [field]: value };
    setFormData(prev => ({ ...prev, [arrayName]: updatedArray }));
  };

  const handleUpdate = async () => {
    try {
      const res = await API.updatePatientbyAdmin({ ...formData, patientId });
      if (res.isSuccess) {
        alert('Patient updated successfully');
        setShowForm(false);
        setPatientId('');
      } else {
        alert(res.msg || 'Update failed');
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
          <div className="hidden lg:block lg:w-60 lg:flex-shrink-0">
            <LeftPanel />
          </div>

          <div className="relative flex-1 h-full overflow-y-auto">
            {!showForm && (
              <div className="w-full flex items-center justify-center min-h-full p-4">
                <div className="z-10 shadow-2xl flex flex-col items-center gap-6 w-full max-w-lg py-8 rounded-[15px] px-6 sm:px-10 border-[#0095DA] bg-white/90 backdrop-blur-lg">
                  <h2 className="text-2xl font-bold text-[#0095DA]">Update Patient Record</h2>
                  <p className="text-gray-600 text-center">Enter the Patient ID manually or use a scanning option to fetch details.</p>
                  
                  <input
                      type="text"
                      value={patientId}
                      onChange={(e) => setPatientId(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="p-3 w-full bg-[#F8FDFF] border rounded-[15px] border-[#0095DA] outline-none text-center text-lg"
                      placeholder="Enter Patient ID & Press Enter"
                  />

                  <div className="text-gray-600 text-center text-sm font-semibold">OR</div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:justify-center">
                    <button className="w-full sm:w-auto bg-[#0095DA] text-white font-bold text-sm rounded-[15px] px-4 py-3">
                      Scan Fingerprint
                    </button>
                    <button onClick={startCameraScanner} className="w-full sm:w-auto bg-[#0095DA] text-white font-bold text-sm rounded-[15px] px-4 py-3">
                      Use Camera
                    </button>
                    <button onClick={() => fileInputRef.current.click()} className="w-full sm:w-auto bg-[#0095DA] text-white font-bold text-sm rounded-[15px] px-4 py-3">
                      Upload QR
                    </button>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden"/>
                  </div>
                </div>
              </div>
            )}

            {showForm && formData && (
              <div className="absolute inset-0 z-20 bg-black/50 flex items-center justify-center p-4">
                <div className="bg-[rgb(182,177,177)] w-full max-w-6xl rounded-xl opacity-90 p-6 md:p-8 flex flex-col items-center gap-6 max-h-[90vh] overflow-y-auto">
                    <h2 className="text-3xl font-bold text-black mb-4 text-center">Update Details for {formData.firstName} {formData.lastName}</h2>
                    
                    {/* Reusing the styled form structure */}
                    <FormSection title="Personal & Contact">
                        <FormField name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                        <FormField name="middleName" placeholder="Middle Name" value={formData.middleName} onChange={handleChange} required={false} />
                        <FormField name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                        <FormField name="dob" type="date" placeholder="Date of Birth" value={formData.dob?.substring(0, 10)} onChange={handleChange} />
                        <FormField name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} />
                        <FormField name="bloodGroup" placeholder="Blood Group" value={formData.bloodGroup} onChange={handleChange} />
                        <FormField name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
                        <FormField name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} />
                        <FormField name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                        <FormField name="emergencyContact" placeholder="Emergency Contact" value={formData.emergencyContact?.[0]} onChange={(e) => setFormData(prev => ({...prev, emergencyContact: [e.target.value]}))} />
                    </FormSection>

                    <FormSection title="Admission" gridCols="lg:grid-cols-4">
                        <FormField name="admission_id" placeholder="Admission ID" value={formData.admission?.admission_id} onChange={(e) => handleNestedChange('admission', e.target.name, e.target.value)} />
                        <FormField name="admission_time" type="datetime-local" placeholder="Admission Time" value={formData.admission?.admission_time?.substring(0, 16)} onChange={(e) => handleNestedChange('admission', e.target.name, e.target.value)} />
                        <FormField name="location" placeholder="Location" value={formData.admission?.location} onChange={(e) => handleNestedChange('admission', e.target.name, e.target.value)} />
                        <FormField name="reason" placeholder="Reason" value={formData.admission?.reason} onChange={(e) => handleNestedChange('admission', e.target.name, e.target.value)} />
                    </FormSection>
                    
                    <div className="flex justify-center mt-6 gap-6">
                        <button onClick={handleUpdate} className="btn btn-neutral btn-outline rounded-xl text-[rgb(0,149,218)] border-[rgb(0,149,218)] font-semibold bg-white border-2 px-10 py-2">
                            Update Patient
                        </button>
                        <button onClick={() => setShowForm(false)} className="btn btn-neutral btn-outline rounded-xl text-red-600 border-red-600 font-semibold bg-white border-2 px-10 py-2">
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
