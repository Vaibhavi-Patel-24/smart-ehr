import React, { useState } from 'react';

function calculateAge(dob) {
  if (!dob) return 'N/A';
  const birth = new Date(dob);
  const today = new Date();
  return today.getFullYear() - birth.getFullYear();
}

function EhrContainer({ data = {} }) {
  const [showMore, setShowMore] = useState(false);

  const {
    patientId = 'N/A',
    firstName = '',
    middleName = '',
    lastName = '',
    dob,
    gender = 'N/A',
    address = 'N/A',
    bloodGroup = 'N/A',
    smoker = false,
    vitals = [],
    symptoms = [],
    diagnoses = {}
  } = data;

  // Extract vitals from array
  const bp = vitals?.find(v => v.type === 'BP')?.value || '';
  const hr = vitals?.find(v => v.type === 'HR')?.value || '';

  const fullName = [firstName, middleName, lastName].filter(Boolean).join(' ') || 'N/A';
  const age = calculateAge(dob);

  return (
    <div className="border border-[#00B2FF] rounded-md p-4 w-full max-w-[600px] mx-auto bg-white text-[#444] font-inter text-sm">
      <h2 className="text-xl font-semibold mb-2 text-[#00B2FF]">Electronic Health Record</h2>

      {/* Patient ID */}
      <input
        type="text"
        readOnly
        value={`"patient_id": "${patientId}"`}
        className="w-full mb-2 p-2 border border-[#00B2FF] rounded text-center bg-[#F8FDFF]"
      />

      {/* Patient Info */}
      <textarea
        readOnly
        value={`"name": "${fullName}",\n"age": ${age},\n"gender": "${gender}",\n"address": "${address}"`}
        className="w-full mb-4 p-2 border border-[#00B2FF] rounded bg-[#F8FDFF]"
        rows={4}
      />

      {/* Blood Group and Smoker */}
      <div className="flex justify-between mb-4">
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Blood Grp:</span>
          <button className="border border-[#00B2FF] px-3 py-1 rounded bg-[#F8FDFF]">
            {bloodGroup || 'N/A'}
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Smoker:</span>
          <button className="border border-[#00B2FF] px-3 py-1 rounded bg-[#F8FDFF]">
            {smoker ? 'Yes' : 'No'}
          </button>
        </div>
      </div>

      {/* Vitals */}
      <div className="mb-4">
        <span className="font-semibold">Vitals:</span>
        <div className="flex gap-4 mt-2">
          <div className="flex gap-2 items-center">
            <span>HR:</span>
            <input
              readOnly
              value={hr}
              className="w-14 px-2 py-1 border border-[#00B2FF] rounded text-center bg-[#F8FDFF]"
            />
          </div>
          <div className="flex gap-2 items-center">
            <span>BP:</span>
            <input
              readOnly
              value={bp}
              className="w-20 px-2 py-1 border border-[#00B2FF] rounded text-center bg-[#F8FDFF]"
            />
          </div>
        </div>
      </div>

      {/* Symptoms */}
      <div className="mb-4">
        <span className="font-semibold">Symptoms:</span>
        <textarea
          readOnly
          value={Array.isArray(symptoms) && symptoms.length > 0 ? symptoms.join(',\n') : 'None'}
          className="w-full mt-1 p-2 border border-[#00B2FF] rounded bg-[#F8FDFF]"
          rows={3}
        />
      </div>

      {/* Diagnoses (Not in DB yet) */}
      <div className="mb-4">
        <span className="font-semibold">Diagnoses:</span>
        <textarea
          readOnly
          value={`"code": "${diagnoses?.code || 'N/A'}",\n"description": "${diagnoses?.description || 'N/A'}",\n"onset": "${diagnoses?.onset || 'N/A'}"`}
          className="w-full mt-1 p-2 border border-[#00B2FF] rounded bg-[#F8FDFF]"
          rows={4}
        />
      </div>

      {/* Show More Toggle */}
      {!showMore && (
        <div className="text-center">
          <p
            onClick={() => setShowMore(true)}
            className="text-[#00B2FF] cursor-pointer hover:underline"
          >
            Show more
          </p>
          <img
            src="/drop-down.svg"
            alt="Toggle Icon"
            className="mx-auto mt-1 w-4 h-4"
          />
        </div>
      )}

      {showMore && (
        <div className="mt-4 border-t pt-4 text-sm text-gray-700">
          <p>Additional details can be displayed here when expanded.</p>
        </div>
      )}
    </div>
  );
}

export default EhrContainer;
