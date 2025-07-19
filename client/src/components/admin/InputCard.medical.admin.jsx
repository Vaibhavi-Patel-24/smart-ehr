import React, { useState } from 'react';
import { API } from '../../service/api'; // Ensure this path is correct

const InputCardMedical = () => {
  const [formData, setFormData] = useState({
    name: '',
    branchName: '',
    address: '',
    contact: '',
    email: '',
    password: '',
    hospitalId: '',
  });

  const fields = [
    { label: 'Name', name: 'name', type: 'text' },
    { label: 'Branch name', name: 'branchName', type: 'text' },
    { label: 'Address', name: 'address', type: 'text' },
    { label: 'Contact', name: 'contact', type: 'text' },
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'Password', name: 'password', type: 'password' },
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
    try {
      const response = await API.addMedical(formData);
      console.log('Response:', response);

      if (response?.isSuccess) {
        alert('Medical user added successfully');
        setFormData({
          name: '',
          branchName: '',
          address: '',
          contact: '',
          email: '',
          password: '',
          hospitalId: '',
        });
      } else {
        alert('Error: Could not add user');
      }
    } catch (error) {
      console.error('Submit Error:', error);
      alert('Server error occurred');
    }
  };

  return (
    <div className="bg-[rgb(182,177,177)] w-full max-w-3xl rounded-xl opacity-80 p-4 flex flex-col justify-center items-center gap-4 overflow-y-auto">
      <div className="w-full flex flex-col gap-4">
        {fields.map((field, idx) => (
          <input
            key={idx}
            name={field.name}
            type={field.type}
            placeholder={field.label}
            value={formData[field.name]}
            onChange={handleChange}
            className="w-full bg-transparent border-b-2 border-black text-black font-semibold px-2 py-1 focus:outline-none"
          />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="btn btn-neutral btn-outline rounded-xl text-[rgb(0,149,218)] border-[rgb(0,149,218)] font-semibold bg-white border-2 px-6 py-2"
      >
        Submit
      </button>
    </div>
  );
};

export default InputCardMedical;
