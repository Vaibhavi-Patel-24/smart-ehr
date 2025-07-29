import React, { useState } from 'react';
import { API } from '../../service/api'; // Ensure this path is correct

const InputCardDoctor = () => {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    contact: '',
    hospitalId: '',
  });

  // Define the fields for the form
  const fields = [
    { label: 'Name', name: 'name', type: 'text' },
    { label: 'Specialization', name: 'specialization', type: 'text' },
    { label: 'Contact', name: 'contact', type: 'tel' }, // Changed type to 'tel' for better semantics
    { label: 'Hospital ID', name: 'hospitalId', type: 'text' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // --- Frontend Validation ---
    for (const field of fields) {
      if (!formData[field.name]) {
        alert(`Please fill out the ${field.label} field.`);
        return;
      }
    }
    
    // Specific validation for the contact number to match the backend schema
    const contactRegex = /^[0-9]{10}$/;
    if (!contactRegex.test(formData.contact)) {
        alert('Please enter a valid 10-digit contact number.');
        return;
    }
    // --- End of Validation ---

    try {
      const response = await API.addDoctor(formData); // Call correct API
      console.log('Response:', response);

      if (response?.isSuccess) {
        alert('Doctor added successfully');
        // Reset form after successful submission
        setFormData({
          name: '',
          specialization: '',
          contact: '',
          hospitalId: '',
        });
      } else {
        alert(response?.msg || 'Error: Could not add doctor');
      }
    } catch (error) {
      console.error('Submit Error:', error);
      alert('A server error occurred. Please try again later.');
    }
  };

  return (
    // Main container with consistent styling
    <div className="bg-[rgb(182,177,177)] w-full max-w-4xl rounded-xl opacity-80 p-6 md:p-8 flex flex-col items-center gap-6">
      
      {/* A 2x2 grid is more balanced for 4 items */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {fields.map((field) => (
          <input
            key={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.label}
            value={formData[field.name]}
            onChange={handleChange}
            className="w-full bg-transparent border-b-2 border-black text-black font-semibold px-2 py-1 focus:outline-none placeholder-gray-700"
          />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="btn btn-neutral btn-outline rounded-xl text-[rgb(0,149,218)] border-[rgb(0,149,218)] font-semibold bg-white border-2 px-10 py-2 mt-4"
      >
        Submit
      </button>
    </div>
  );
};

export default InputCardDoctor;
