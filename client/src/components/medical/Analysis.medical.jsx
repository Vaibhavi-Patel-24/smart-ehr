import React, { useState } from 'react';
import { API } from '../../service/api.js'; // adjust path as needed

function Analysismedical({ existingSymptoms = [] }) {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [manualSymptoms, setManualSymptoms] = useState('');
  const [analysisResult, setAnalysisResult] = useState([]);
  const [doctorName, setDoctorName] = useState('');

  const symptomList = [
    'FEVER', 'COUGH', 'FATIGUE', 'HEADACHE', 'MUSCLE ACHES', 'SORE THROAT',
    'RUNNY NOSE', 'SNEEZING', 'CHILLS', 'NAUSEA', 'VOMITING', 'DIARRHEA',
    'ABDOMINAL PAIN', 'JOINT PAIN', 'SHORTNESS OF BREATH', 'RASH', 'EYE REDNESS',
    'CHEST PAIN', 'INTENSE LOCALIZED PAIN', 'SWELLING DEFORMITY',
    'NUMBNESS WEAKNESS ONE SIDED', 'DIFFICULTY SPEAKING', 'WHEEZING', 'PAINFUL URINATION'
  ];

  const handleCheckboxChange = (e) => {
    const symptom = e.target.value;
    setSelectedSymptoms(prev =>
      e.target.checked ? [...prev, symptom] : prev.filter(s => s !== symptom)
    );
  };

  const handleAnalyze = async () => {
    const manual = manualSymptoms
      ? manualSymptoms.split(',').map(s => s.trim().toUpperCase())
      : [];

    const combinedSymptoms = [
      ...new Set([...existingSymptoms.map(s => s.toUpperCase()), ...selectedSymptoms, ...manual])
    ];

    if (combinedSymptoms.length === 0) {
      alert("Please select or enter at least one symptom");
      return;
    }

    try {
      console.log(`predicting`)
      const response = await API.predictDisease({ symptoms: combinedSymptoms });
      
      if (response.isSuccess) {
        console.log(`predicted`)
        const result = response.data;
        setAnalysisResult([result]);
        
        // ✅ Fetch doctor by specialization
        const hospitalId = sessionStorage.getItem('hospitalId');
        // console.log(hospitalId || 'error getting hid')
        // console.log(result.specialization)
        if (hospitalId && result.specialization) {
          // console.log(`getting doctor`)
          const doctorRes = await API.getDoctorsByHospitalAndSpecialization({
              hospitalId: hospitalId,
              specialization: result.specialization
          });         
          // console.log(`got doctor`)
          // console.log(doctorRes.data)
          if (doctorRes.data?.length > 0) {
            console.log(doctorRes.data[0].name)
            setDoctorName(doctorRes.data[0].name);
          } else {
            setDoctorName('No matching doctor found');
          }
        } else {
          setDoctorName('Hospital ID or specialization missing');
        }
      } else {
        alert("Prediction failed: " + response.msg);
      }
    } catch (error) {
      alert("An error occurred during prediction or doctor fetching.");
    }
  };

  return (
    <div className="border z-1000 border-[#00B2FF] rounded-md p-4 w-full max-w-[600px] mx-auto bg-white text-[#00B2FF] font-inter text-sm">
      <h2 className="text-xl font-semibold mb-2">Assistance</h2>

      {/* Symptom selection */}
      <div className="border border-[#00B2FF] p-3 rounded mb-4">
        <p className="text-xs mb-2">Select from</p>
        <div className="grid grid-cols-3 gap-2 text-black">
          {symptomList.map(symptom => (
            <label key={symptom}>
              <input type="checkbox" value={symptom} onChange={handleCheckboxChange} />
              {' '}{symptom}
            </label>
          ))}
        </div>
      </div>

      {/* Manual input */}
      <p className="text-center text-sm mb-1">OR</p>
      <div className="border border-[#00B2FF] rounded mb-4">
        <p className="text-xs pl-2 pt-1">Type symptoms (comma separated)</p>
        <textarea
          placeholder="e.g. Head ache, Cough"
          className="w-full p-2 outline-none bg-transparent resize-none text-black"
          rows={4}
          value={manualSymptoms}
          onChange={(e) => setManualSymptoms(e.target.value)}
        />
      </div>

      <div className="text-center mb-4">
        <button
          onClick={handleAnalyze}
          className="border border-[#00B2FF] px-6 py-1 rounded hover:bg-[#E3F4FF]"
        >
          Analyze
        </button>
      </div>

      {/* Existing Symptoms */}
      {existingSymptoms.length > 0 && (
        <div className="mb-4 p-3 bg-[#F0F8FF] border border-[#00B2FF] rounded-md">
          <p className="font-semibold text-[#00B2FF] mb-1">Symptoms from EHR:</p>
          <ul className="list-disc ml-5 text-black text-sm">
            {existingSymptoms.map((sym, i) => (
              <li key={i}>{sym}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Predicted Result */}
      {analysisResult.map((res, index) => (
        <div key={index} className="bg-[#E6F7FF] border border-[#00B2FF] p-4 rounded-md mt-4">
          <p className="text-black text-sm mb-1">
            <span className="font-bold text-[#00B2FF]">Predicted Disease:</span> {res.disease}
          </p>
          <p className="text-black text-sm">
            <span className="font-bold text-[#00B2FF]">Recommended Specialist:</span> {res.specialization}
          </p>
          <p className="text-black text-sm">
            <span className="font-bold text-[#00B2FF]">Recommended Doctor:</span> {doctorName}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Analysismedical;
