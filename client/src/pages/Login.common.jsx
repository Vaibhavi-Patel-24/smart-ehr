// author - Krish 
// created at 12/07/25
// updated at 3:06AM 13/07/2025
import { useState } from "react"
import { API } from '../service/api.js';
import { useNavigate } from 'react-router-dom';



function LoginCommon() {
  const [role,changeRole] = useState('patient')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [medicalId, setMedicalId] = useState('');
  const [medicalPassword, setMedicalPassword] = useState('');

  const navigate = useNavigate();


  const handleMedicalLogin = async () => {
    try {
      const response = await API.loginMedical({email: medicalId, password: medicalPassword,});     
      if (response.isSuccess) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        alert("Medical login successful!");
        // TODO: redirect to medical dashboard
        navigate('/medical/home');
      } else {
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
      localStorage.setItem("token", token);
      alert("Login successful!");
      // TODO: navigate to dashboard
      navigate("/patient/home"); 
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
      
      {/* Wrapper for both boxes with fixed width */}
      <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row w-[100%] max-w-7xl min-h-[500px] gap-2 items-stretch">
        
        {/* Left Panel (60%) */}
        <div className="w-full sm:w-full md:w-full lg:w-[70%] bg-[#3D3D3D]/50 rounded-[15px] p-2 flex flex-col justify-start">
          <div className="mb-10">
            <img src="/logo.svg" alt="logo" className="lg:h-25 lg:w-25 h-16 w-16 sm:h-20 sm:w-20" />
          </div>
          <div className="flex justify-center">
            <div>
              <p className="text-white text-[18px] sm:text-[20px] md:text-[22px] lg:text-[22px] font-inter">
                Access your
              </p>
              <p className="ml-6 sm:ml-8 md:ml-10 text-[#FF8F9A] text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] font-inter font-semibold">
                Medical Records
              </p>
              <p className="ml-6 sm:ml-8 md:ml-10 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-white font-semibold italic font-inter lg:max-w-[500px] md:max-w-[500px]">
                securely and instantly—anytime, anywhere, when it matters most.
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel (40%) */}
<div className="relative w-full sm:w-full md:w-full lg:w-[60%] h-[500px] sm:h-[520px] md:h-[520px] perspective" style={{ perspective: "1000px" }}>
  <div
    className={`w-full h-full transition-transform duration-700 ease-in-out relative`}
    style={{
      transformStyle: "preserve-3d",
      transform: role === 'medical' ? 'rotateY(180deg)' : 'rotateY(0deg)'
    }}
  >
    {/* Front Side - Patient */}
    <div
      className="absolute w-full h-full backface-hidden bg-white/10 backdrop-blur-md rounded-[15px] p-8 flex flex-col justify-center items-center"
      style={{ backfaceVisibility: 'hidden' }}
    >
      <div className="flex justify-center mb-6">
        <img src="/logopatient.svg" alt="Patient Logo" className="h-28 w-28 sm:h-32 sm:w-32 lg:h-35 lg:w-35" />
      </div>
      <div className="font-inter lg:w-sm justify-center text-white flex flex-col gap-6 w-full sm:w-[90%]">
        <input
          type="text"
          placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-transparent border-b-2 pl-4 border-white placeholder-white/70 text-white py-2 outline-none focus:border-[#FF8F9A] transition duration-300"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-transparent border-b-2 pl-4 border-white placeholder-white/70 text-white py-2 outline-none focus:border-[#FF8F9A] transition duration-300"
        />
        <div className="flex justify-end text-[12px]">
          <p>Forgotten Password?</p>
        </div>
      </div>
      <div className="flex-row mt-8 justify-center items-end">
        <button  
        onClick={handlePatientLogin}
        className="bg-[#539ADC]/90 hover:bg-[#539ADC] text-white border border-white py-2 px-18 rounded-[15px] ">
          Login
        </button>
        <div className="flex justify-center pt-2">
          <p className="text-[10px] text-[#2C21FF] cursor-pointer" onClick={() => changeRole('medical')}>
            Healthcare Login?
          </p>
        </div>
      </div>
    </div>

    {/* Back Side - Medical */}
    <div
      className="absolute w-full h-full bg-white/10 backdrop-blur-md rounded-[15px] p-8 flex flex-col justify-center items-center"
      style={{
        transform: "rotateY(180deg)",
        backfaceVisibility: "hidden",
        position: "absolute",
        top: 0,
        left: 0
      }}
    >
      <div className="flex justify-center mb-6">
        <img src="/logomedical.svg" alt="Medical Logo" className="h-28 w-28 sm:h-32 sm:w-32 lg:h-35 lg:w-35" />
      </div>
      <div className="font-inter lg:w-sm justify-center text-white flex flex-col gap-6 w-full sm:w-[90%]">
        <input
          type="text"
          placeholder="Medical ID"
          value={medicalId}
          onChange={(e) => setMedicalId(e.target.value)}
          className="w-full bg-transparent border-b-2 pl-4 border-white placeholder-white/70 text-white py-2 outline-none focus:border-[#FF8F9A] transition duration-300"
        />
        <input
          type="password"
          placeholder="Password"
          value={medicalPassword}
          onChange={(e) => setMedicalPassword(e.target.value)}
          className="w-full bg-transparent border-b-2 pl-4 border-white placeholder-white/70 text-white py-2 outline-none focus:border-[#FF8F9A] transition duration-300"
        />
        <div className="flex justify-end text-[12px]">
          <p>Forgotten Password?</p>
        </div>
      </div>
      <div className="flex-row mt-8 justify-center items-end">
        <button 
        onClick={handleMedicalLogin}
        className="bg-[#539ADC]/90 hover:bg-[#539ADC] text-white border border-white py-2 px-18 rounded-[15px] ">
          Login
        </button>
        <div className="flex justify-center pt-2">
          <p className="text-[10px] text-[#2C21FF] cursor-pointer" onClick={() => changeRole('patient')}>
            Patient Login?
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  )
}

export default LoginCommon
