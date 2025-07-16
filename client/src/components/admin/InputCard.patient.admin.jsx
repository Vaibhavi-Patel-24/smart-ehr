import React from 'react'
import { API } from '../../service/api.js'; // ✅ adjust path as needed
import { useState } from 'react';
const fieldMap = {
  'First Name': 'firstName',
  'Middle Name': 'middleName',
  'Last Name': 'lastName',
  'Date of Birth': 'dob',
  'Blood Group': 'bloodGroup',
  'Gender': 'gender',
  'Address': 'address',
  'Admissions': 'admission',
  'Labs': 'notes',
  'Vitals': 'vitals',
  'Symptoms': 'symptoms',
  'Medication': 'medications',
  'Procedure': 'procedures',
  'Contact': 'contact',
  'Emergency Contacts': 'emergencyContact',
  'Email': 'email',
  'Finger_print_hash^': 'fingerPrint',
  'retina_scan_hash^': 'retinaScan',
};

const inputGroups = [
  ['First Name', 'Middle Name', 'Last Name'],
  ['Date of Birth', 'Blood Group', 'Gender'],
  ['Address', 'Admissions', 'Labs'],
  ['Vitals', 'Symptoms', 'Medication'],
  ['Procedure', 'Contact', 'Emergency Contacts'],
  ['Email', 'Finger_print_hash^', 'retina_scan_hash^'],
];

const InputCard = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (field, value) => {
    const mappedField = fieldMap[field] || field;
    setFormData(prev => ({ ...prev, [mappedField]: value }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        password: 'default@123', // Or prompt for password if needed
        vitals: formData.vitals ? [{ value: formData.vitals, timestamp: new Date() }] : [],
        medications: formData.medications ? [{ name: formData.medications, start_date: new Date() }] : [],
        notes: formData.notes ? [{ text: formData.notes, timestamp: new Date() }] : [],
      };

      const res = await API.addPatient(payload);
      if (res.isSuccess) {
        alert(res.data.message || 'Patient added successfully!');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert(error.msg || 'Failed to add patient');
      console.error(error);
    }
  };
  return (
    <>
      <div className="bg-[rgb(182,177,177)] w-2/3 h-2/3 lg:w-[750px] lg:h-[400px] rounded-xl opacity-80 flex flex-col justify-center items-center gap-4 overflow-y-scroll pl-3 pr-3 lg:pl-0 lg:pr-0">
      <div className="w-full h-full overflow-y-auto px-3 py-4 flex flex-col gap-4">
      {inputGroups.map((group, idx) => (
        <div className="flex flex-col lg:flex-row gap-4 mt-1" key={idx}>
          {group.map((placeholder, index) => (
            <input
              key={index}
              type={placeholder.toLowerCase().includes('date') ? 'date' : 'text'}
              placeholder={placeholder}
              className={`bg-transparent border-b-2 border-black text-black font-semibold px-2 py-1 focus:outline-none ${
                    placeholder.toLowerCase().includes('date') ? 'min-w-[214px]' : ''  }`}
                    onChange={(e) => handleChange(placeholder, e.target.value)}
            />
          ))}
        </div>
      ))}
      </div>

      <button className="btn btn-neutral btn-outline rounded-xl text-[rgb(0,149,218)] border-[rgb(0,149,218)] font-semibold bg-white border-2 mb-3"  onClick={handleSubmit}>
        Submit
      </button>
    </div>
      
    </>
  )
}

export default InputCard
