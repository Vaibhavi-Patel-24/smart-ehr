

import React, { useState } from 'react';
import { API } from '../../service/api.js'; // adjust path as needed

function Analysismedical() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [manualSymptoms, setManualSymptoms] = useState('');
  const [analysisResult, setAnalysisResult] = useState([]);

  const symptomList = [
    'ELBOW PAIN', 'COUGH', 'FATIGUE', 'FEVER', 'ANKLE WEAKNESS', 'EACHING', 'DEPRESSION', 'SHORTNESS OF BREATH',' ANXIETY AND NERVOUSNESS'
  ];

  const handleCheckboxChange = (e) => {
    const symptom = e.target.value;
    setSelectedSymptoms(prev =>
      e.target.checked ? [...prev, symptom] : prev.filter(s => s !== symptom)
    );
  };

  const handleAnalyze = async () => {
    const symptoms = manualSymptoms
      ? manualSymptoms.split(',').map(s => s.trim().toUpperCase())
      : selectedSymptoms;

    if (symptoms.length === 0) {
      alert("Please select or enter at least one symptom");
      return;
    }

    try {
      const response = await API.predictDisease({ symptoms });
      console.log("response.data", response.data);
      console.log("Type of data:", typeof response.data);
      if (response.isSuccess) {
        setAnalysisResult([response.data]); // Should be an array of { disease, confidence }
      } else {
        console.error("Prediction failed:", response);
        alert("Prediction failed: " + response.msg);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during prediction.");
    }
  };

  return (
    <div className="border z-1000 border-[#00B2FF] rounded-md p-4 w-full max-w-[600px] mx-auto bg-white text-[#00B2FF] font-inter text-sm">
      <h2 className="text-xl font-semibold mb-2">Assistance</h2>

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

     {analysisResult.map((res, index) => (
      <div key={index}>
        <p><span className="font-bold">Disease:</span> {res.disease}</p>
        <p><span className="font-bold">Specialist:</span> {res.specialization}</p>
      </div>
    ))}

    </div>
  );
}

export default Analysismedical;
