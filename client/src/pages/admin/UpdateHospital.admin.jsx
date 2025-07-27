import React, { useState } from 'react';
import doctor from '../../assets/doctor.jpg'; // Adjust path if needed
import LeftPanel from '../../components/admin/LeftPanel.admin.jsx'; // Adjust path if needed
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
    password: '', // Kept for future use if needed
  });

  /**
   * Fetches hospital data when the form is submitted.
   */
  const handleFetchHospitalData = async () => {
    if (!hospitalId) {
      alert("Please enter a Hospital ID.");
      return;
    }
    try {
      const res = await API.getHospital({ hospitalId });
      if (res.isSuccess) {
        const data = res.data.hospital;
        setFormData({
          name: data.name || '',
          address: data.address || '',
          email: data.email || '',
          contact: data.contact || '',
          // Safely access coordinates
          latitude: data.location?.coordinates?.[1]?.toString() || '',
          longitude: data.location?.coordinates?.[0]?.toString() || '',
          password: '', // Always clear password field for security
        });
        setShowForm(true);
      } else {
        alert("Hospital ID not found");
      }
    } catch (err) {
      console.error("Failed to fetch hospital data:", err);
      alert("An error occurred while fetching hospital data.");
    }
  };

  /**
   * Handles the 'Enter' key press on the input field.
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleFetchHospitalData();
    }
  };

  /**
   * Handles changes in the update form fields.
   */
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * Submits the updated hospital data to the API.
   */
  const handleUpdate = async () => {
    try {
      const updatedData = {
        name: formData.name,
        address: formData.address,
        email: formData.email,
        contact: formData.contact,
        location: {
          type: 'Point',
          coordinates: [
            parseFloat(formData.longitude) || 0, 
            parseFloat(formData.latitude) || 0
          ],
        },
        hospitalId,
      };
      
      // Conditionally add password if it has been changed
      if (formData.password) {
        updatedData.password = formData.password;
      }

      const res = await API.updateHospital(updatedData);
      if (res.isSuccess) {
        alert("Hospital updated successfully");
        setShowForm(false);
        setHospitalId(''); // Clear ID after update
      } else {
        alert(res.msg || "Update failed");
      }
    } catch (err) {
      console.error("Error while updating:", err);
      alert("An error occurred during the update.");
    }
  };

  return (
    <>
      <div className="fixed inset-0 overflow-hidden">
        {/* Background Image and Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${doctor})` }}
        />
        <div className="absolute inset-0 bg-black opacity-40" />

        {/* Main Flex Layout Container */}
        <div className="absolute inset-0 flex">
          
          {/* Left Panel (Sidebar) */}
          <div className="lg:w-60 lg:h-full lg:overflow-hidden">
            <LeftPanel />
          </div>
          
          {/* Right Content Area Wrapper */}
          <div className="relative flex-1 h-full overflow-y-auto">
            
            {/* Show search form only when update form is not visible */}
            {!showForm && (
              <div className="w-full flex items-center justify-center min-h-full p-4">
                <div className="z-10 shadow-2xl flex flex-col items-center gap-6 w-full max-w-lg py-8 rounded-[15px] px-6 sm:px-10 border-[#0095DA] bg-white/90 backdrop-blur-lg">
                  <h2 className="text-2xl font-bold text-[#0095DA]">Update Hospital Record</h2>
                  <p className="text-gray-600 text-center">Enter the Hospital ID below and click Submit to fetch the details.</p>
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-4">
                    <input
                      type="text"
                      value={hospitalId}
                      onChange={(e) => setHospitalId(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="p-3 flex-grow bg-[#F8FDFF] border rounded-[15px] border-[#0095DA] outline-none text-sm sm:text-base"
                      placeholder="Enter Hospital ID"
                    />
                    <button 
                      onClick={handleFetchHospitalData}
                      className="w-full sm:w-auto bg-[#0095DA] text-white font-bold text-sm sm:text-base rounded-[15px] px-8 py-3 transition-transform transform hover:scale-105"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal for Updating Hospital Details */}
            {showForm && (
              <div className="absolute inset-0 z-20 bg-black/50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-xl border border-[#0095DA] p-6 w-full max-w-2xl max-h-[95vh] overflow-y-auto">
                  <h2 className="text-xl font-bold text-[#0095DA] mb-6 text-center">Update Hospital Details</h2>
                  
                  <div className="flex flex-col gap-4">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 rounded-md" placeholder="Hospital Name"/>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-2 rounded-md" placeholder="Email"/>
                    <input type="text" name="contact" value={formData.contact} onChange={handleChange} className="border p-2 rounded-md" placeholder="Contact"/>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} className="border p-2 rounded-md" placeholder="Address"/>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input type="number" name="latitude" value={formData.latitude} onChange={handleChange} className="border p-2 rounded-md w-full" placeholder="Latitude"/>
                        <input type="number" name="longitude" value={formData.longitude} onChange={handleChange} className="border p-2 rounded-md w-full" placeholder="Longitude"/>
                    </div>
                    
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="border p-2 rounded-md" placeholder="New Password (optional)"/>

                    <div className="flex flex-col sm:flex-row justify-between mt-4 gap-3">
                      <button onClick={handleUpdate} className="w-full bg-[#0095DA] text-white px-6 py-2 rounded-lg">
                        Update
                      </button>
                      <button onClick={() => setShowForm(false)} className="w-full border border-[#0095DA] text-[#0095DA] px-6 py-2 rounded-lg">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateHospital;
