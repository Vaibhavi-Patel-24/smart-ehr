import React, { useState } from 'react';
import doctor from '../../assets/doctor.jpg'; // Adjust path if needed
import LeftPanel from '../../components/admin/LeftPanel.admin'; // Adjust path if needed
import { API } from '../../service/api'; // Adjust path if needed

const Updatemedical = () => {
  const [medicalId, setMedicalId] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    branchName: '',
    password: '',
  });

  /**
   * Fetches medical data when the form is submitted (either by Enter key or button click).
   */
  const handleFetchMedicalData = async () => {
    if (!medicalId) {
      alert("Please enter a Medical ID.");
      return;
    }
    try {
      const res = await API.getMedicalById({ medicalId });
      if (res.isSuccess) {
        setFormData(res.data.medical);
        setShowForm(true);
      } else {
        alert("Medical ID not found");
      }
    } catch (err) {
      console.error("Failed to fetch medical data:", err);
      alert("An error occurred while fetching medical data.");
    }
  };

  /**
   * Handles the 'Enter' key press on the input field.
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleFetchMedicalData();
    }
  };

  /**
   * Handles changes in the update form fields.
   */
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * Submits the updated medical data to the API.
   */
  const handleUpdate = async () => {
    try {
      const res = await API.updateMedicalByAdmin({ ...formData, medicalId });
      if (res.isSuccess) {
        alert("Medical updated successfully");
        setShowForm(false);
        setMedicalId(''); // Clear the ID after successful update
      } else {
        alert("Update failed");
      }
    } catch (err) {
      console.error("Error while updating:", err);
      alert("An error occurred while updating.");
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
                  <h2 className="text-2xl font-bold text-[#0095DA]">Update Medical Record</h2>
                  <p className="text-gray-600 text-center">Enter the Medical ID below and click Submit to fetch the details.</p>
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-4">
                    <input
                      type="text"
                      value={medicalId}
                      onChange={(e) => setMedicalId(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="p-3 flex-grow bg-[#F8FDFF] border rounded-[15px] border-[#0095DA] outline-none text-sm sm:text-base"
                      placeholder="Enter Medical ID"
                    />
                    <button 
                      onClick={handleFetchMedicalData}
                      className="w-full sm:w-auto bg-[#0095DA] text-white font-bold text-sm sm:text-base rounded-[15px] px-8 py-3 transition-transform transform hover:scale-105"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal for Updating Medical Details */}
            {showForm && (
              <div className="absolute inset-0 z-20 bg-black/50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-xl border border-[#0095DA] p-6 w-full max-w-2xl max-h-[95vh] overflow-y-auto">
                  <h2 className="text-xl font-bold text-[#0095DA] mb-4 text-center">Update Medical Details</h2>
                  
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="border p-2 rounded-md"
                      placeholder="Name"
                    />
                    <input
                      type="email"
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
                    <input
                      type="text"
                      name="branchName"
                      value={formData.branchName}
                      onChange={handleChange}
                      className="border p-2 rounded-md"
                      placeholder="Branch Name"
                    />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="border p-2 rounded-md"
                      placeholder="New Password (optional)"
                    />

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
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Updatemedical;
