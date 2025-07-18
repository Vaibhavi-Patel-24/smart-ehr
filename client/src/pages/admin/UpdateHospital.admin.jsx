import React, { useState } from 'react';
// import hospitalBg from '../../assets/hospital.jpg';
import doctor from '../../assets/doctor.jpg'
import LeftPanel from '../../components/admin/LeftPanel.admin.jsx';
import { API } from '../../service/api.js'; // Ensure hospital API methods are defined

const UpdateHospital = () => {
  const [hospitalId, setHospitalId] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    contact: '',
    latitude: '',
    longitude: '',
    password: '',
  });

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && hospitalId) {
      try {
        const res = await API.getHospital({ hospitalId });
        if (res.isSuccess) {
          const data = res.data.hospital;

          setFormData({
            name: data.name,
            address: data.address,
            email: data.email,
            contact: data.contact,
            latitude: data.location.coordinates[1].toString(),
            longitude: data.location.coordinates[0].toString(),
          });

          setShowForm(true);
        } else {
          alert("Hospital ID not found");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to fetch hospital data");
      }
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {
        ...formData,
        location: {
          type: 'Point',
          coordinates: [parseFloat(formData.longitude), parseFloat(formData.latitude)],
        },
        hospitalId,
      };

      const res = await API.updateHospital(updatedData);
      if (res.isSuccess) {
        alert("Hospital updated successfully");
        setShowForm(false);
      } else {
        alert("Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error while updating");
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${doctor})` }}
            />
      <div className="absolute inset-0 bg-black opacity-40" />

      <div className="absolute inset-0 flex">
        <div className="lg:w-60">
          <LeftPanel />
        </div>

        {!showForm && (<div className="w-full flex items-center flex-col gap-4 pt-40">
          <div className="z-10 shadow-2xl border-2 w-[90%] sm:w-[80%] md:w-[65%] lg:w-[60%] rounded-[15px] px-6 py-6 border-[#0095DA] bg-white/90 backdrop-blur-lg">
            <div className="flex flex-col items-center gap-6 w-full">
              <input
                type="text"
                value={hospitalId}
                onChange={(e) => setHospitalId(e.target.value)}
                onKeyDown={handleKeyDown}
                className="p-3 w-full sm:w-[80%] bg-[#F8FDFF] border rounded-[15px] border-[#0095DA] outline-none text-sm sm:text-base"
                placeholder="Enter Hospital ID"
              />
            </div>
          </div>
        </div>)}

        {showForm && (
          <div className="z-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl border border-[#0095DA] p-6 w-[90%] sm:w-[60%] md:w-[50%]">
            <h2 className="text-xl font-bold text-[#0095DA] mb-4 text-center">Update Hospital Details</h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 rounded-md"
                placeholder="Hospital Name"
              />
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 rounded-md"
                placeholder="Email"
              />
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="border p-2 rounded-md"
                placeholder="Contact"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border p-2 rounded-md"
                placeholder="Address"
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-1/2"
                  placeholder="Latitude"
                />
                <input
                  type="text"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-1/2"
                  placeholder="Longitude"
                />
              </div>
              {/* <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border p-2 rounded-md"
                placeholder="New Password (optional)"
              /> */}

              <div className="flex justify-between mt-4">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateHospital;
