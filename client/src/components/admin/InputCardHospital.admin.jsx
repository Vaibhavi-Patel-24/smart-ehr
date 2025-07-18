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
    <div className="bg-[rgb(182,177,177)] w-2/3 h-2/3 lg:w-[720px] lg:h-[200px] rounded-xl opacity-80 flex flex-col justify-center items-center gap-4 overflow-y-scroll pl-3 pr-3 lg:pl-0 lg:pr-0 ">
      {[
        ['Name', 'Address', 'Contact'],
        ['Email','Latitude','Longitude'],
      ].map((group, idx) => (
        <div className="flex flex-col lg:flex-row gap-4" key={idx}>
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
