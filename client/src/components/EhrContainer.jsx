import React, { useState, useEffect } from 'react';

function calculateAge(dob) {
  if (!dob) return 'N/A';
  const birth = new Date(dob);
  const today = new Date();
  return today.getFullYear() - birth.getFullYear();
}

function EhrContainer({ data = {}, editMode }) {
  const role = localStorage.getItem('role');
  const isMedical = role === 'medical';
  const isPatient = role === 'patient';
  const isAdmin = role === 'admin';

  const [ehrData, setEhrData] = useState(data);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setEhrData(data);
  }, [data]);

  useEffect(() => {
    const handleCollectFields = () => {
      if (!editMode) return;

      let payload = {};

      if (isAdmin) {
        payload = {
          vitals: ehrData.vitals,
          symptoms: ehrData.symptoms,
          admission: ehrData.admission,
          procedures: ehrData.procedures,
          notes: ehrData.notes,
          medications: ehrData.medications,
          address: ehrData.address,
          contact: ehrData.contact,
          emergencyContact: ehrData.emergencyContact,
          email: ehrData.email,
        };
      } else if (isMedical) {
        payload = {
          vitals: ehrData.vitals,
          symptoms: ehrData.symptoms,
          admission: ehrData.admission,
          procedures: ehrData.procedures,
          notes: ehrData.notes,
          medications: ehrData.medications,
        };
      } else if (isPatient) {
        payload = {
          address: ehrData.address,
          contact: ehrData.contact,
          email: ehrData.email,
          emergencyContact: ehrData.emergencyContact,
        };
      }

      const event = new CustomEvent('ehr-submit-payload', { detail: payload });
      window.dispatchEvent(event);
    };

    window.addEventListener('ehr-collect-fields', handleCollectFields);
    return () => window.removeEventListener('ehr-collect-fields', handleCollectFields);
  }, [ehrData, editMode, isAdmin, isMedical, isPatient]);

  const handleFieldChange = (field, value) => {
    setEhrData(prev => ({ ...prev, [field]: value }));
  };

  const handleVitalsChange = (type, value) => {
    setEhrData(prev => ({
      ...prev,
      vitals: prev.vitals.map(v => v.type === type ? { ...v, value } : v)
    }));
  };

  const {
    patientId = 'N/A',
    firstName = '',
    middleName = '',
    lastName = '',
    dob,
    gender = 'N/A',
    address = '',
    bloodGroup = 'N/A',
    smoker = false,
    diagnoses = {},
    admission = {},
    contact = '',
    email = 'N/A',
  } = ehrData;

  const vitals = Array.isArray(ehrData.vitals) ? ehrData.vitals : [];
  const symptoms = Array.isArray(ehrData.symptoms) ? ehrData.symptoms : [];
  const medications = Array.isArray(ehrData.medications) ? ehrData.medications : [];
  const procedures = Array.isArray(ehrData.procedures) ? ehrData.procedures : [];
  const notes = Array.isArray(ehrData.notes) ? ehrData.notes : [];
  const emergencyContact = Array.isArray(ehrData.emergencyContact) ? ehrData.emergencyContact : [];

  const bp = vitals?.find(v => v.type === 'BP')?.value || '';
  const hr = vitals?.find(v => v.type === 'HR')?.value || '';
  const fullName = [firstName, middleName, lastName].filter(Boolean).join(' ') || 'N/A';
  const age = calculateAge(dob);

  const canEdit = field =>
    (isAdmin && field !== 'patientId') ||
    (isMedical && ['vitals', 'symptoms', 'medications', 'procedures', 'notes', 'admission'].includes(field)) ||
    (isPatient && ['contact','email', 'address', 'emergencyContact'].includes(field));

  return (
    <div className="border z-1000 border-[#00B2FF] rounded-md p-4 w-full max-w-[600px] mx-auto bg-white text-[#444] font-inter text-sm">
      <h2 className="text-xl font-semibold mb-2 text-[#00B2FF]">Electronic Health Record</h2>

      <input
        type="text"
        readOnly
        value={`"patient_id": "${patientId}"`}
        className="w-full mb-2 p-2 border border-[#00B2FF] rounded text-center bg-[#F8FDFF]"
      />

      <textarea
        readOnly
        value={`"name": "${fullName}",\n"age": ${age},\n"gender": "${gender}",\n"address": "${address}"`}
        className="w-full mb-4 p-2 border border-[#00B2FF] rounded bg-[#F8FDFF]"
        rows={4}
      />

      <div className="flex justify-between mb-4">
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Blood Grp:</span>
          <button className="border border-[#00B2FF] px-3 py-1 rounded bg-[#F8FDFF]">{bloodGroup}</button>
        </div>
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Smoker:</span>
          <button className="border border-[#00B2FF] px-3 py-1 rounded bg-[#F8FDFF]">{smoker ? 'Yes' : 'No'}</button>
        </div>
      </div>

      {/* Vitals */}
      <div className="mb-4">
        <span className="font-semibold">Vitals:</span>
        <div className="flex gap-4 mt-2">
          <div className="flex gap-2 items-center">
            <span>HR:</span>
            <input
              readOnly={!editMode || !canEdit('vitals')}
              value={hr}
              onChange={(e) => handleVitalsChange('HR', e.target.value)}
              className="w-14 px-2 py-1 border border-[#00B2FF] rounded text-center bg-[#F8FDFF]"
            />
          </div>
          <div className="flex gap-2 items-center">
            <span>BP:</span>
            <input
              readOnly={!editMode || !canEdit('vitals')}
              value={bp}
              onChange={(e) => handleVitalsChange('BP', e.target.value)}
              className="w-20 px-2 py-1 border border-[#00B2FF] rounded text-center bg-[#F8FDFF]"
            />
          </div>
        </div>
      </div>

      {/* Symptoms */}
      <div className="mb-4">
        <span className="font-semibold">Symptoms:</span>
        <textarea
          readOnly={!editMode || !canEdit('symptoms')}
          value={symptoms.join(', ')}
          onChange={(e) => handleFieldChange('symptoms', e.target.value.split(',').map(s => s.trim()))}
          className="w-full mt-1 p-2 border border-[#00B2FF] rounded bg-[#F8FDFF]"
          rows={3}
        />
      </div>

      {/* Diagnoses (Read-only) */}
      <div className="mb-4">
        <span className="font-semibold">Diagnoses:</span>
        <textarea
          readOnly
          value={`"code": "${diagnoses?.code || 'N/A'}",\n"description": "${diagnoses?.description || 'N/A'}",\n"onset": "${diagnoses?.onset || 'N/A'}"`}
          className="w-full mt-1 p-2 border border-[#00B2FF] rounded bg-[#F8FDFF]"
          rows={4}
        />
      </div>

      {!showMore ? (
        <div className="text-center">
          <p onClick={() => setShowMore(true)} className="text-[#00B2FF] cursor-pointer hover:underline">
            Show more
          </p>
          <img src="/drop-down.svg" alt="Toggle Icon" className="mx-auto mt-1 w-4 h-4" />
        </div>
      ) : (
        <div className="mt-4 border-t pt-4 text-sm text-gray-700 space-y-3 text-left">
          {/* Contact Info */}
          <div>
            <p><strong>Contact:</strong> {editMode && canEdit('contact') ? (
              <input className="border p-1 rounded w-full" value={contact} onChange={(e) => handleFieldChange('contact', e.target.value)} />
            ) : contact}</p>

            <p><strong>Email:</strong> {editMode && canEdit('email') ? (
              <input
                type="email"
                className="border p-1 w-full rounded"
                value={email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
              />
            ) : email || 'N/A'}</p>

            <p><strong>Emergency Contacts:</strong> {editMode && canEdit('emergencyContact') ? (
              <textarea
                className="border p-1 w-full rounded"
                value={emergencyContact.join(', ')}
                onChange={(e) => handleFieldChange('emergencyContact', e.target.value.split(',').map(c => c.trim()))}
              />
            ) : emergencyContact.join(', ') || 'N/A'}</p>
          </div>

          {/* Address */}
          <div>
            <p><strong>Address:</strong></p>
            {editMode && canEdit('address') ? (
              <input className="border p-1 rounded w-full" value={address} onChange={(e) => handleFieldChange('address', e.target.value)} />
            ) : <p>{address}</p>}
          </div>

          {/* Admission */}
          <div>
            <p><strong>Admission ID:</strong> {admission.admission_id || 'N/A'}</p>
            <p><strong>Location:</strong> {editMode && canEdit('admission') ? (
              <input value={admission.location || ''} onChange={(e) => setEhrData(prev => ({ ...prev, admission: { ...prev.admission, location: e.target.value } }))} className="border px-2 py-1" />
            ) : admission.location || 'N/A'}</p>
            <p><strong>Reason:</strong> {editMode && canEdit('admission') ? (
              <input value={admission.reason || ''} onChange={(e) => setEhrData(prev => ({ ...prev, admission: { ...prev.admission, reason: e.target.value } }))} className="border px-2 py-1" />
            ) : admission.reason || 'N/A'}</p>
          </div>

          {/* Procedures */}
          <div>
            <p><strong>Procedures:</strong></p>
            <textarea
              readOnly={!editMode || !canEdit('procedures')}
              value={procedures.join(', ')}
              onChange={(e) => handleFieldChange('procedures', e.target.value.split(',').map(p => p.trim()))}
              className="w-full p-2 border border-[#00B2FF] rounded bg-[#F8FDFF]"
              rows={2}
            />
          </div>

          {/* Notes */}
          {notes.length > 0 && (
            <div>
              <p><strong>Notes:</strong></p>
              <ul className="list-disc ml-4">
                {notes.map((note, i) => (
                  <li key={i}>
                    <strong>{note.author}</strong>: {note.content} ({new Date(note.timestamp).toLocaleString()})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Medications */}
          {medications.length > 0 && (
            <div>
              <p><strong>Medications:</strong></p>
              <ul className="list-disc ml-4">
                {medications.map((med, i) => (
                  <li key={i}>
                    {med.name} - {med.dose}, {med.frequency} (from {med.start_date?.slice(0, 10)})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default EhrContainer;
