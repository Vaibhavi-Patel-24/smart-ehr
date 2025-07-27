import React, { useState } from 'react';
import { API } from '../../service/api'; // Ensure this has `addHospital` method

const InputCardHospital = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contact: '',
    email: '',
    longitude: '',
    latitude: '',
  });

  const placeholderToFieldMap = {
    'Name': 'name',
    'Address': 'address',
    'Contact': 'contact',
    'Email': 'email',
    'Longitude': 'longitude',
    'Latitude': 'latitude',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { name, address, contact, email, longitude, latitude } = formData;

    if (!longitude || !latitude) {
      alert("Please enter both longitude and latitude");
      return;
    }

    try {
      const hospitalData = {
        name,
        address,
        contact,
        email,
        location: {
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
        }
      };

      const response = await API.addHospital(hospitalData);
      if (response?.isSuccess) {
        alert("Hospital added successfully");
        setFormData({
          name: '',
          address: '',
          contact: '',
          email: '',
          longitude: '',
          latitude: '',
        });
        
      } else {
        alert("Error: Could not add hospital");
      }
    } catch (err) {
      console.error(err);
      alert("Server error occurred");
    }
  };

  return (
    <div className="bg-[rgb(182,177,177)] w-full max-w-4xl rounded-xl opacity-80 p-6 md:p-8 flex flex-col items-center gap-6 overflow-y-auto">
      {[
        ['Name', 'Address', 'Contact'],
        ['Email','Latitude','Longitude'],
      ].map((group, idx) => (
        <div className="w-full flex flex-col lg:flex-row gap-6" key={idx}>
          {group.map((placeholder, index) => (
            <input
              key={index}
              name={placeholderToFieldMap[placeholder]}
              value={formData[placeholderToFieldMap[placeholder]]}
              onChange={handleChange}
              type={
                placeholder.toLowerCase().includes('email') ? 'email' :
                placeholder.toLowerCase().includes('longitude') || placeholder.toLowerCase().includes('latitude') ? 'number' :
                'text'
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

export default InputCardHospital;
