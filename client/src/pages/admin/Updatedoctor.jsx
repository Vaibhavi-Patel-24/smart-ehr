import React, { useState } from 'react';
import doctor from '../../assets/doctor.jpg';
import LeftPanel from '../../components/admin/LeftPanel.admin.jsx';
import { API } from '../../service/api.js'; // Make sure API service is imported

const Updatedoctor = () => {
  const [showForm, setShowForm] = useState(false);
  const [doctorId, setDoctorId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    contact: '',
    hospitalId:'' // Corrected from hospitalid
  });

  /**
   * Fetches doctor data from the API based on the doctorId.
   */
  const handleFetchDoctorData = async () => {
    if (!doctorId) {
      alert("Please enter a Doctor ID.");
      return;
    }
    try {
      // Assuming the API service is set up to handle getDoctorById({ doctorId })
      const res = await API.getDoctorById({ doctorId });
      if (res.isSuccess) {
        const data = res.data.doctor;
        setFormData({
          name: data.name || '',
          specialization: data.specialization || '',
          contact: data.contact || '',
          // The populated hospitalId is an object, so we need its _id for the value
          hospitalId: data.hospitalId?._id || data.hospitalId || ''
        });
        setShowForm(true);
      } else {
        alert("Doctor ID not found");
      }
    } catch (err) {
      console.error("Failed to fetch doctor data:", err);
      alert("An error occurred while fetching doctor data.");
    }
  };

  /**
   * Handles the 'Enter' key press on the input field to trigger a fetch.
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleFetchDoctorData();
    }
  };

  /**
   * Handles changes in the update form fields.
   */
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * Submits the updated doctor data to the API.
   */
  const handleUpdate = async () => {
    try {
      // The API service should correctly format the request 
      // (e.g., doctorId in params, formData in body)
      const res = await API.updateDoctor({ ...formData, doctorId });
      if (res.isSuccess) {
        alert("Doctor updated successfully");
        setShowForm(false);
        setDoctorId(''); // Clear the ID after successful update
      } else {
        alert(res.msg || "Update failed");
      }
    } catch (err) {
      console.error("Error while updating doctor:", err);
      alert("An error occurred during the update.");
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${doctor})` }} />
      <div className="absolute inset-0 bg-black opacity-40" />

      <div className="absolute inset-0 flex">
        {/* Sidebar */}
        <div className="hidden lg:block lg:w-60 lg:flex-shrink-0">
          <LeftPanel />
        </div>


        {/* Main Content */}
        <div className="relative flex-1 h-full overflow-y-auto">
          {/* Search Form */}
          {!showForm && (
            <div className="w-full flex items-center justify-center min-h-full p-4">
              <div className="z-10 shadow-2xl flex flex-col items-center gap-6 w-full max-w-lg py-8 rounded-[15px] px-6 sm:px-10 border-[#0095DA] bg-white/90 backdrop-blur-lg">
                <h2 className="text-2xl font-bold text-[#0095DA]">Update Doctor Record</h2>
                <p className="text-gray-600 text-center">Enter the Doctor ID below and click Submit to fetch the details.</p>
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-4">
                  <input
                    type="text"
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    onKeyDown={handleKeyDown} // Added KeyDown handler
                    className="p-3 flex-grow bg-[#F8FDFF] border rounded-[15px] border-[#0095DA] outline-none text-sm sm:text-base"
                    placeholder="Enter Doctor ID"
                  />
                  <button
                    onClick={handleFetchDoctorData} // Replaced dummy function
                    className="w-full sm:w-auto bg-[#0095DA] text-white font-bold text-sm sm:text-base rounded-[15px] px-8 py-3 transition-transform transform hover:scale-105"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Update Form */}
          {showForm && (
            <div className="absolute inset-0 z-20 bg-black/50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-xl border border-[#0095DA] p-6 w-full max-w-2xl max-h-[95vh] overflow-y-auto">
                <h2 className="text-xl font-bold text-[#0095DA] mb-6 text-center">Update Doctor Details</h2>

                <div className="flex flex-col gap-4">
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 rounded-md" placeholder="Doctor Name" />
                  <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} className="border p-2 rounded-md" placeholder="Specialization" />
                  <input type="text" name="contact" value={formData.contact} onChange={handleChange} className="border p-2 rounded-md" placeholder="Contact" />
                  <input type="text" name="hospitalId" value={formData.hospitalId} onChange={handleChange} className="border p-2 rounded-md" placeholder="Hospital ID" />

                  <div className="flex flex-col sm:flex-row justify-between mt-4 gap-3">
                    <button onClick={handleUpdate} className="w-full bg-[#0095DA] text-white px-6 py-2 rounded-lg">
                      Save Changes
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
  );
};

export default Updatedoctor;
