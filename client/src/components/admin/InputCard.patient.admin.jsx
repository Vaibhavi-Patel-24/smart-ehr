import React, { useState } from 'react';
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
 * A styled, reusable input field with a label.
 */
const FormField = ({ label, name, value, onChange, type = 'text', placeholder, required = true, className = '' }) => (
  <div className={`flex flex-col ${className}`}>
    <label htmlFor={name} className="text-sm font-semibold text-black mb-1">
      {label}{required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder || `Enter ${label}...`}
      className="w-full bg-transparent border-b-2 border-black text-black font-semibold px-2 py-1 focus:outline-none placeholder-gray-700"
    />
  </div>
);

// --- Main Component ---

const defaultFormData = {
  firstName: '', middleName: '', lastName: '',
  dob: '', bloodGroup: '', gender: '', address: '', contact: '', email: '',
  fingerPrint: '', retinaScan: '', emergencyContact: [''],
  symptoms: [''], procedures: [''],
  admission: { admission_id: '', admission_time: '', location: '', reason: '' },
  vitals: [{ type: '', value: '' }],
  medications: [{ name: '', dose: '', frequency: '', start_date: '', end_date: '' }],
  notes: [{ author: '', timestamp: '', content: '' }],
  password: ''
};

const InputCard = () => {
  const [formData, setFormData] = useState({ ...defaultFormData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNestedChange = (section, field, value) => {
      setFormData(prev => ({
          ...prev,
          [section]: { ...prev[section], [field]: value }
      }));
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    const updatedArray = [...formData[arrayName]];
    updatedArray[index] = { ...updatedArray[index], [field]: value };
    setFormData(prev => ({ ...prev, [arrayName]: updatedArray }));
  };

  const handleSubmit = async () => {
    try {
      // Note: Add more robust validation as needed
      const payload = { ...formData }; // Create a copy to transform
      const res = await API.addPatient(payload);
      if (res.isSuccess) {
        alert(res.data.message || 'Patient added successfully!');
        setFormData({ ...defaultFormData }); // Clear form
      } else {
        alert(res.msg || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      alert(error.message || 'Failed to add patient');
      console.error(error);
    }
  };

  return (
    <div className="bg-[rgb(182,177,177)] w-full max-w-6xl rounded-xl opacity-90 p-6 md:p-8 flex flex-col items-center gap-6 max-h-[85vh] overflow-y-auto">
      
      <div className="w-full">
        <FormSection title="Personal Information">
          <FormField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
          <FormField label="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange} required={false} />
          <FormField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
          <FormField label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />
          <FormField label="Gender" name="gender" value={formData.gender} onChange={handleChange} />
          <FormField label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} />
        </FormSection>

        <FormSection title="Contact & Authentication">
          <FormField label="Address" name="address" value={formData.address} onChange={handleChange} />
          <FormField label="Contact Number" name="contact" value={formData.contact} onChange={handleChange} />
          <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          <FormField label="Emergency Contact" name="emergencyContact" value={formData.emergencyContact[0]} onChange={(e) => setFormData(prev => ({...prev, emergencyContact: [e.target.value]}))} />
          <FormField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Default: 123" required={false} />
        </FormSection>
        
        <FormSection title="Biometric Hashes (Optional)" gridCols="lg:grid-cols-2">
            <FormField label="Fingerprint Hash" name="fingerPrint" value={formData.fingerPrint} onChange={handleChange} required={false} />
            <FormField label="Retina Scan Hash" name="retinaScan" value={formData.retinaScan} onChange={handleChange} required={false} />
        </FormSection>

        <FormSection title="Admission Details" gridCols="lg:grid-cols-4">
            <FormField label="Admission ID" name="admission_id" value={formData.admission.admission_id} onChange={(e) => handleNestedChange('admission', e.target.name, e.target.value)} />
            <FormField label="Admission Time" name="admission_time" type="datetime-local" value={formData.admission.admission_time} onChange={(e) => handleNestedChange('admission', e.target.name, e.target.value)} />
            <FormField label="Location / Ward" name="location" value={formData.admission.location} onChange={(e) => handleNestedChange('admission', e.target.name, e.target.value)} />
            <FormField label="Reason" name="reason" value={formData.admission.reason} onChange={(e) => handleNestedChange('admission', e.target.name, e.target.value)} />
        </FormSection>

        <FormSection title="Medication" gridCols="lg:grid-cols-5">
            <FormField label="Med Name" name="name" value={formData.medications[0].name} onChange={(e) => handleArrayChange('medications', 0, e.target.name, e.target.value)} />
            <FormField label="Dose" name="dose" value={formData.medications[0].dose} onChange={(e) => handleArrayChange('medications', 0, e.target.name, e.target.value)} />
            <FormField label="Frequency" name="frequency" value={formData.medications[0].frequency} onChange={(e) => handleArrayChange('medications', 0, e.target.name, e.target.value)} />
            <FormField label="Start Date" name="start_date" type="date" value={formData.medications[0].start_date} onChange={(e) => handleArrayChange('medications', 0, e.target.name, e.target.value)} />
            <FormField label="End Date" name="end_date" type="date" value={formData.medications[0].end_date} onChange={(e) => handleArrayChange('medications', 0, e.target.name, e.target.value)} required={false}/>
        </FormSection>

        <FormSection title="Initial Assessment">
            <FormField label="Vital Sign Type" name="type" placeholder="e.g., Blood Pressure" value={formData.vitals[0].type} onChange={(e) => handleArrayChange('vitals', 0, e.target.name, e.target.value)} />
            <FormField label="Vital Sign Value" name="value" placeholder="e.g., 120/80 mmHg" value={formData.vitals[0].value} onChange={(e) => handleArrayChange('vitals', 0, e.target.name, e.target.value)} />
            <FormField label="Symptoms (comma-separated)" name="symptoms" value={formData.symptoms.join(', ')} onChange={(e) => setFormData(prev => ({...prev, symptoms: e.target.value.split(',').map(s=>s.trim())}))} className="md:col-span-2 lg:col-span-1" />
            <FormField label="Procedures (comma-separated)" name="procedures" value={formData.procedures.join(', ')} onChange={(e) => setFormData(prev => ({...prev, procedures: e.target.value.split(',').map(p=>p.trim())}))} className="md:col-span-2 lg:col-span-3" />
        </FormSection>
        
        <div className="w-full flex justify-center mt-8">
            <button
                onClick={handleSubmit}
                className="btn btn-neutral btn-outline rounded-xl text-[rgb(0,149,218)] border-[rgb(0,149,218)] font-semibold bg-white border-2 px-12 py-2"
            >
                Add Patient
            </button>
        </div>
      </div>
    </div>
  );
};

export default InputCard;
