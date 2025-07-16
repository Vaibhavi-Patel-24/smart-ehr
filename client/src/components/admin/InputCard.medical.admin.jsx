import React, { useState } from 'react';
import { API } from '../../service/api'; // adjust if needed

const InputCardMedical = () => {
  const [formData, setFormData] = useState({
    name: '',
    branchName: '',
    address: '',
    contact: '',
    email: '',
    password: '',
  });

  const placeholderToFieldMap = {
    'Name': 'name',
    'Branch name': 'branchName',
    'Address': 'address',
    'Contact': 'contact',
    'Email': 'email',
    'Password': 'password',
  };

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
      console.log(response)
      if (response?.isSuccess) {
        alert("Medical user added successfully");
        setFormData({
          name: '',
          branchName: '',
          address: '',
          contact: '',
          email: '',
          password: '',
        });
      } else {
        alert("Error: Could not add user");
      }
    } catch (err) {
      console.error(err);
      alert("Server error occurred");
    }
  };

  return (
    <div className="bg-[rgb(182,177,177)] w-2/3 h-2/3 lg:w-[720px] lg:h-[200px] rounded-xl opacity-80 flex flex-col justify-center items-center gap-4 overflow-y-scroll pl-3 pr-3 lg:pl-0 lg:pr-0 ">
      {[
        ['Name', 'Branch name', 'Address'],
        ['Contact', 'Email', 'Password'],
      ].map((group, idx) => (
        <div className="flex flex-col lg:flex-row gap-4" key={idx}>
          {group.map((placeholder, index) => (
            <input
              key={index}
              name={placeholderToFieldMap[placeholder]}
              value={formData[placeholderToFieldMap[placeholder]]}
              onChange={handleChange}
              type={
                placeholder.toLowerCase().includes('password') ? 'password' :
                placeholder.toLowerCase().includes('email') ? 'email' : 'text'
              }
              placeholder={placeholder}
              className="bg-transparent border-b-2 border-black text-black font-semibold px-2 py-1 focus:outline-none"
            />
          ))}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="btn btn-neutral btn-outline rounded-xl text-[rgb(0,149,218)] border-[rgb(0,149,218)] font-semibold bg-white border-2"
      >
        Submit
      </button>
    </div>
  );
};

export default InputCardMedical;
