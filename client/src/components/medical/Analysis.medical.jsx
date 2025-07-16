import React, { useState } from 'react';

function Analysismedical() {
      const [showAnalysis, setShowAnalysis] = useState(false);
          const handleAnalyze = () => {
                // your analysis logic can go here
                setShowAnalysis(true);
            };
  return(
  <div className="border z-1000 border-[#00B2FF] rounded-md p-4 w-full max-w-[600px] mx-auto bg-white text-[#00B2FF] font-inter text-sm">
      
      <h2 className="text-xl font-semibold mb-2">Assistance</h2>

      {/* Symptom Checklist */}
      <div className="border border-[#00B2FF] p-3 rounded mb-4">
        <p className="text-xs mb-2">select from</p>
        <div className="grid grid-cols-3 gap-2 text-black">
          {/* Render symptom checkboxes here */}
          <label><input type="checkbox" /> HEAD ACHE</label>
          <label><input type="checkbox" /> COUGH</label>
          <label><input type="checkbox" /> FATIGUE</label>
          <label><input type="checkbox" /> CONTINUOUS SNEEZING</label>
          <label><input type="checkbox" /> ANXIETY</label>
          <label><input type="checkbox" /> SHIVERING</label>
          <label><input type="checkbox" /> JOINT PAIN</label>
          <label><input type="checkbox" /> EACHING</label>
          <label><input type="checkbox" /> STOMACH PAIN</label>
        </div>
        {/* Show More and Arrow SVG */}
        <p className="text-center text-sm mt-2 cursor-pointer hover:underline">Show more</p>
        <img src="/drop-down.svg" className="mx-auto w-4 h-4" alt="dropdown arrow" />
      </div>

      {/* OR Divider */}
      <p className="text-center text-sm mb-1">OR</p>

      {/* Textarea Input */}
      <div className="border border-[#00B2FF] rounded mb-4">
        <p className="text-xs pl-2 pt-1">type Here</p>
        <textarea
          placeholder="Say Symptoms..."
          className="w-full p-2 outline-none bg-transparent resize-none text-black"
          rows={4}
        />
      </div>

      {/* Analyze Button */}
      <div className="text-center mb-4">
        <button
          onClick={handleAnalyze}
          className="border border-[#00B2FF] px-6 py-1 rounded hover:bg-[#E3F4FF]"
        >
          Analyze
        </button>
      </div>

      {/* Conditional Analysis Box */}
      {showAnalysis && (
        <div className="border border-[#00B2FF] rounded p-4 mt-2">
          <p className="font-semibold">Analysis</p>
          <p className="mt-2">
            <span className="font-bold">PREDICTION :</span> DEPRESSION
            <br />
            <span className="font-bold">MEDICINES :</span>
          </p>
          <ul className="list-disc list-inside mt-1">
            <li>Selective serotonin reuptake inhibitors (SSRIs)</li>
            <li>Heterocyclic antidepressants</li>
            <li>Monoamine oxidase inhibitors (MAOIs)</li>
            <li>Melatonergic antidepressant (agomelatine)</li>
            <li>Bupropion</li>
            <li>Mirtazapine</li>
            <li>Trazodone</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Analysismedical