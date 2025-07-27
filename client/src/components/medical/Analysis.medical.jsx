// import React, { useState } from 'react';

// function Analysismedical() {
//       const [showAnalysis, setShowAnalysis] = useState(false);
//           const handleAnalyze = () => {
//                 // your analysis logic can go here
//                 setShowAnalysis(true);
//             };
//   return(
//   <div className="border z-1000 border-[#00B2FF] rounded-md p-4 w-full max-w-[600px] mx-auto bg-white text-[#00B2FF] font-inter text-sm">
      
//       <h2 className="text-xl font-semibold mb-2">Assistance</h2>

//       {/* Symptom Checklist */}
//       <div className="border border-[#00B2FF] p-3 rounded mb-4">
//         <p className="text-xs mb-2">select from</p>
//         <div className="grid grid-cols-3 gap-2 text-black">
//           {/* Render symptom checkboxes here */}
//           <label><input type="checkbox" /> HEAD ACHE</label>
//           <label><input type="checkbox" /> COUGH</label>
//           <label><input type="checkbox" /> FATIGUE</label>
//           <label><input type="checkbox" /> CONTINUOUS SNEEZING</label>
//           <label><input type="checkbox" /> ANXIETY</label>
//           <label><input type="checkbox" /> SHIVERING</label>
//           <label><input type="checkbox" /> JOINT PAIN</label>
//           <label><input type="checkbox" /> EACHING</label>
//           <label><input type="checkbox" /> STOMACH PAIN</label>
//         </div>
//         {/* Show More and Arrow SVG */}
//         <p className="text-center text-sm mt-2 cursor-pointer hover:underline">Show more</p>
//         <img src="/drop-down.svg" className="mx-auto w-4 h-4" alt="dropdown arrow" />
//       </div>

//       {/* OR Divider */}
//       <p className="text-center text-sm mb-1">OR</p>

//       {/* Textarea Input */}
//       <div className="border border-[#00B2FF] rounded mb-4">
//         <p className="text-xs pl-2 pt-1">type Here</p>
//         <textarea
//           placeholder="Say Symptoms..."
//           className="w-full p-2 outline-none bg-transparent resize-none text-black"
//           rows={4}
//         />
//       </div>

//       {/* Analyze Button */}
//       <div className="text-center mb-4">
//         <button
//           onClick={handleAnalyze}
//           className="border border-[#00B2FF] px-6 py-1 rounded hover:bg-[#E3F4FF]"
//         >
//           Analyze
//         </button>
//       </div>

//       {/* Conditional Analysis Box */}
//       {showAnalysis && (
//         <div className="border border-[#00B2FF] rounded p-4 mt-2">
//           <p className="font-semibold">Analysis</p>
//           <p className="mt-2">
//             <span className="font-bold">PREDICTION :</span> DEPRESSION
//             <br />
//             <span className="font-bold">MEDICINES :</span>
//           </p>
//           <ul className="list-disc list-inside mt-1">
//             <li>Selective serotonin reuptake inhibitors (SSRIs)</li>
//             <li>Heterocyclic antidepressants</li>
//             <li>Monoamine oxidase inhibitors (MAOIs)</li>
//             <li>Melatonergic antidepressant (agomelatine)</li>
//             <li>Bupropion</li>
//             <li>Mirtazapine</li>
//             <li>Trazodone</li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Analysismedical

import React, { useState } from 'react';
import { API } from '../../service/api.js'; // adjust path as needed

function Analysismedical() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [manualSymptoms, setManualSymptoms] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

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
