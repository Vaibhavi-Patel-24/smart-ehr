import React, { useState } from 'react';
import doctor from '../../assets/doctor.jpg';
import LeftPanel from '../../components/admin/LeftPanel.admin.jsx';

const Updatedoctor = () => {
  const [showForm, setShowForm] = useState(false);
  const [doctorId, setDoctorId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    contact: '',
    hospitalid:''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDummyFetch = () => {
    if (!doctorId) {
      alert("Please enter a Doctor ID.");
      return;
    }
    // For now, just show empty form
    setShowForm(true);
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${doctor})` }} />
      <div className="absolute inset-0 bg-black opacity-40" />

      <div className="absolute inset-0 flex">
        {/* Sidebar */}
        <div className="hidden lg:block lg:w-60">
          <LeftPanel />
        </div>

        {/* Main Content */}
        <div className="relative flex-1 h-full overflow-y-auto pb-20">
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
                    className="p-3 flex-grow bg-[#F8FDFF] border rounded-[15px] border-[#0095DA] outline-none text-sm sm:text-base"
                    placeholder="Enter Doctor ID"
                  />
                  <button
                    onClick={handleDummyFetch}
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
                  <input type="text" name="hospitalid" value={formData.hospitalid} onChange={handleChange} className="border p-2 rounded-md" placeholder="Hospitalid" />

                  <div className="flex flex-col sm:flex-row justify-between mt-4 gap-3">
                    <button className="w-full bg-[#0095DA] text-white px-6 py-2 rounded-lg">
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
