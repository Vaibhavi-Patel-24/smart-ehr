import React, { useState } from 'react'

function EhrContainer({ data }) {
    const [showMore, setShowMore] = useState(false);

  return (
    <div className="border border-[#00B2FF] rounded-md p-4 w-full max-w-[600px] mx-auto bg-white text-[#444] font-inter text-sm">
      <h2 className="text-xl font-semibold mb-2 text-[#00B2FF]">Electronic Health Record</h2>
      {/* Patient ID */}
      <input
        type="text"
        readOnly
        value={`"patient_id": "${data.patient_id}"`}
        className="w-full mb-2 p-2 border border-[#00B2FF] rounded text-center bg-[#F8FDFF]"
      />

      {/* Patient Info */}
      <textarea
        readOnly
        value={`"name": "${data.name}",\n"age": ${data.age},\n"gender": "${data.gender}",\n"address": "${data.address}"`}
        className="w-full mb-4 p-2 border border-[#00B2FF] rounded bg-[#F8FDFF]"
        rows={4}
      />

      {/* Blood Group and Smoker */}
      <div className="flex justify-between mb-4">
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Blood Grp:</span>
          <button className="border border-[#00B2FF] px-3 py-1 rounded bg-[#F8FDFF]">{data.blood_group}</button>
        </div>
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Smoker:</span>
          <button className="border border-[#00B2FF] px-3 py-1 rounded bg-[#F8FDFF]">{data.smoker ? 'Yes' : 'No'}</button>
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
              value={data.vitals.hr}
              className="w-14 px-2 py-1 border border-[#00B2FF] rounded text-center bg-[#F8FDFF]"
            />
          </div>
          <div className="flex gap-2 items-center">
            <span>BP:</span>
            <input
              readOnly
              value={data.vitals.bp}
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
          value={data.symptoms.join(',\n')}
          className="w-full mt-1 p-2 border border-[#00B2FF] rounded bg-[#F8FDFF]"
          rows={3}
        />
      </div>

      {/* Diagnoses */}
      <div className="mb-4">
        <span className="font-semibold">Diagnoses:</span>
        <textarea
          readOnly
          value={`"code": "${data.diagnoses.code}",\n"description": "${data.diagnoses.description}",\n"onset": "${data.diagnoses.onset}"`}
          className="w-full mt-1 p-2 border border-[#00B2FF] rounded bg-[#F8FDFF]"
          rows={4}
        />
      </div>

        {/* Show More Toggle (hidden after expand) */}
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


      {/* Optional: Additional Details */}
      {showMore && (
        <div className="mt-4 border-t pt-4 text-sm text-gray-700">
          <p>Additional details can be displayed here when expanded.</p>
        </div>
      )}
    </div>
  );
}

export default EhrContainer