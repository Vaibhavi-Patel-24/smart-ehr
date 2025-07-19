// LoginCommon.jsx
import { useState } from "react";
import { API } from '../service/api.js';
import { useNavigate } from 'react-router-dom';
import { usePatient } from '../context/PatientContextProvider.jsx'; // ✅ Import context

function LoginCommon() {
  const [role, changeRole] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [medicalId, setMedicalId] = useState('');
  const [medicalPassword, setMedicalPassword] = useState('');

  const navigate = useNavigate();
  const { setPatientId } = usePatient(); // ✅ Set from context

  const handleMedicalLogin = async () => {
    try {
      const response = await API.loginMedical({ email: medicalId, password: medicalPassword });
     if (response.isSuccess) {
      const token = response.data.token;
      const medicalId = response.data.user.medicalId; // assuming backend sends full user under "medical"
      const hospitalId = response.data.user.hospitalId; // assuming backend sends full user under "medical"
      console.log(medicalId)
      if (medicalId) {
        sessionStorage.setItem("medicalId", medicalId);
        sessionStorage.setItem("hospitalId", hospitalId);
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", "medical");

      alert("Medical login successful!");
      navigate('/medical/home');
    }else {
        alert("Medical login failed");
      }

    } catch (error) {
      alert("Invalid credentials or server error");
      console.error(error);
    }
  };

  const handlePatientLogin = async () => {
    try {
      const response = await API.loginPatient({ email, password });
      if (response.isSuccess) {
        const token = response.data.token;
        const patientIdFromServer = response.data.patientId; // 👈 make sure backend returns this

        localStorage.setItem("token", token);
        localStorage.setItem("role", "patient");
        console.log(patientIdFromServer)
        setPatientId(patientIdFromServer); // ✅ set in context + sessionStorage

        alert("Login successful!");
        navigate(`/patient/home`);
      } else {
        alert("Login failed");
      }
    } catch (error) {
      alert("Invalid credentials or server error");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[url('/bglogin.jpg')] bg-cover bg-center bg-no-repeat sm:px-4">
      <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row w-[100%] max-w-7xl min-h-[500px] gap-2 items-stretch">
        {/* Left Panel */}
        <div className="w-full lg:w-[70%] bg-[#3D3D3D]/50 rounded-[15px] p-2 flex flex-col justify-start">
          <div className="mb-10">
            <img src="/logo.svg" alt="logo" className="h-16 w-16 sm:h-20 sm:w-20" />
          </div>
          <div className="flex justify-center">
            <div>
              <p className="text-white text-[18px] sm:text-[20px] md:text-[22px]">Access your</p>
              <p className="ml-6 text-[#FF8F9A] text-[32px] sm:text-[36px] md:text-[40px] font-semibold">Medical Records</p>
              <p className="ml-6 text-[18px] sm:text-[24px] text-white font-semibold italic max-w-[500px]">securely and instantly—anytime, anywhere, when it matters most.</p>
            </div>
          </div>
        </div>

        {/* Right Panel (flipping) */}
        <div className="relative w-full lg:w-[60%] h-[500px] perspective" style={{ perspective: "1000px" }}>
          <div className={`w-full h-full transition-transform duration-700 ease-in-out relative`} style={{ transformStyle: "preserve-3d", transform: role === 'medical' ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
            
            {/* Patient Side */}
            <div className="absolute w-full h-full backface-hidden bg-white/10 backdrop-blur-md rounded-[15px] p-8 flex flex-col justify-center items-center" style={{ backfaceVisibility: 'hidden' }}>
              <div className="flex justify-center mb-6">
                <img src="/logopatient.svg" alt="Patient Logo" className="h-28 w-28" />
              </div>
              <div className="font-inter flex flex-col gap-6 w-full sm:w-[90%] text-white">
                <input type="text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent border-b-2 pl-4 border-white placeholder-white/70 text-white py-2 outline-none focus:border-[#FF8F9A]" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent border-b-2 pl-4 border-white placeholder-white/70 text-white py-2 outline-none focus:border-[#FF8F9A]" />
                <div className="flex justify-end text-[12px]"><p>Forgotten Password?</p></div>
              </div>
              <div className="mt-8">
                <button onClick={handlePatientLogin} className="bg-[#539ADC]/90 hover:bg-[#539ADC] text-white border border-white py-2 px-10 rounded-[15px]">Login</button>
                <div className="flex justify-center pt-2">
                  <p className="text-[10px] text-[#2C21FF] cursor-pointer" onClick={() => changeRole('medical')}>Healthcare Login?</p>
                </div>
              </div>
            </div>

            {/* Medical Side */}
            <div className="absolute w-full h-full bg-white/10 backdrop-blur-md rounded-[15px] p-8 flex flex-col justify-center items-center" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}>
              <div className="flex justify-center mb-6">
                <img src="/logomedical.svg" alt="Medical Logo" className="h-28 w-28" />
              </div>
              <div className="font-inter flex flex-col gap-6 w-full sm:w-[90%] text-white">
                <input type="text" placeholder="Medical ID" value={medicalId} onChange={(e) => setMedicalId(e.target.value)} className="w-full bg-transparent border-b-2 pl-4 border-white placeholder-white/70 text-white py-2 outline-none focus:border-[#FF8F9A]" />
                <input type="password" placeholder="Password" value={medicalPassword} onChange={(e) => setMedicalPassword(e.target.value)} className="w-full bg-transparent border-b-2 pl-4 border-white placeholder-white/70 text-white py-2 outline-none focus:border-[#FF8F9A]" />
                <div className="flex justify-end text-[12px]"><p>Forgotten Password?</p></div>
              </div>
              <div className="mt-8">
                <button onClick={handleMedicalLogin} className="bg-[#539ADC]/90 hover:bg-[#539ADC] text-white border border-white py-2 px-10 rounded-[15px]">Login</button>
                <div className="flex justify-center pt-2">
                  <p className="text-[10px] text-[#2C21FF] cursor-pointer" onClick={() => changeRole('patient')}>Patient Login?</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginCommon;
