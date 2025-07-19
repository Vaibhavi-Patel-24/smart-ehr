import React, { useState } from 'react';
import { API } from '../../service/api';

const defaultFormData = {
  firstName: '', middleName: '', lastName: '',
  dob: '', bloodGroup: '', gender: '', address: '', contact: '', email: '',
  fingerPrint: '', retinaScan: '', emergencyContact: [''],
  symptoms: [''], procedures: [''],
  admission: { admission_id: '', admission_time: '', location: '', reason: '' },
  vitals: [{ type: '', value: '' }],
  medications: [{ name: '', dose: '', frequency: '', start_date: '', end_date: '' }],
  notes: [{ author: '', timestamp: '', content: '' }],
  password: ''
};

const InputCard = () => {
  const [formData, setFormData] = useState({ ...defaultFormData });

  const handleFieldChange = (field, value) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const handleAdmissionChange = (field, value) =>
    setFormData(prev => ({ ...prev, admission: { ...prev.admission, [field]: value } }));

  const handleArrayChange = (array, index, key, value) => {
    const copy = [...formData[array]];
    copy[index][key] = value;
    setFormData(prev => ({ ...prev, [array]: copy }));
  };

  const label = (text, required = true) => (
    <label className="text-sm font-semibold text-black">
      {text}{required && <span className="text-red-600">*</span>}
    </label>
  );

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        password: formData.password?.trim() || '123',
        dob: new Date(formData.dob),
        vitals: formData.vitals.map(v => ({ ...v, timestamp: new Date() })),
        medications: formData.medications.map(m => ({
          ...m,
          start_date: new Date(m.start_date),
          end_date: m.end_date ? new Date(m.end_date) : null
        })),
        notes: formData.notes.map(n => ({
          ...n,
          timestamp: new Date(n.timestamp)
        }))
      };

      const res = await API.addPatient(payload);
      if (res.isSuccess) {
        alert(res.data.message || 'Patient added successfully!');
        setFormData({ ...defaultFormData }); // ✅ Clear form
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert(error.message || 'Failed to add patient');
      console.error(error);
    }
  };

  return (
    <div className="bg-[rgb(182,177,177)] w-11/12 max-w-4xl h-[90vh] rounded-xl opacity-90 flex flex-col justify-start items-center gap-4 overflow-y-scroll p-4 shadow-lg">
      <div className="w-full h-full overflow-y-auto px-3 py-4 flex flex-col gap-5">
        
        {/* Basic Info */}
        <div className="flex flex-col lg:flex-row gap-4">
          {['First Name', 'Middle Name', 'Last Name'].map((labelName, idx) => (
            <div className="flex flex-col flex-1" key={idx}>
              {label(labelName, labelName !== 'Middle Name')}
              <input className="input input-bordered"
                value={formData[labelName.toLowerCase().replace(' ', '')]}
                onChange={e => handleFieldChange(labelName.toLowerCase().replace(' ', ''), e.target.value)} />
            </div>
          ))}
        </div>

        {/* Demographics */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex flex-col flex-1">{label('Date of Birth')}
            <input type="date" className="input input-bordered" value={formData.dob} onChange={e => handleFieldChange('dob', e.target.value)} />
          </div>
          <div className="flex flex-col flex-1">{label('Blood Group')}
            <input className="input input-bordered" value={formData.bloodGroup} onChange={e => handleFieldChange('bloodGroup', e.target.value)} />
          </div>
          <div className="flex flex-col flex-1">{label('Gender')}
            <input className="input input-bordered" value={formData.gender} onChange={e => handleFieldChange('gender', e.target.value)} />
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col lg:flex-row gap-4">
          {['Address', 'Contact', 'Email'].map((field, i) => (
            <div className="flex flex-col flex-1" key={i}>
              {label(field)}
              <input className="input input-bordered" value={formData[field.toLowerCase()]} onChange={e => handleFieldChange(field.toLowerCase(), e.target.value)} />
            </div>
          ))}
        </div>

        {/* Password */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex flex-col flex-1">{label('Password')}
            <input type="password" className="input input-bordered" placeholder="Leave empty for default: 123" value={formData.password} onChange={e => handleFieldChange('password', e.target.value)} />
          </div>
        </div>

        {/* Bio Auth */}
        <div className="flex flex-col lg:flex-row gap-4">
          {['fingerPrint', 'retinaScan'].map((field, i) => (
            <div className="flex flex-col flex-1" key={i}>
              {label(field === 'fingerPrint' ? 'Finger Print Hash' : 'Retina Scan Hash')}
              <input className="input input-bordered" value={formData[field]} onChange={e => handleFieldChange(field, e.target.value)} />
            </div>
          ))}
          <div className="flex flex-col flex-1">{label('Emergency Contact(s)')}
            <input className="input input-bordered" value={formData.emergencyContact[0]} onChange={e => handleFieldChange('emergencyContact', [e.target.value])} />
          </div>
        </div>

        {/* Admission */}
        <div className="border-t pt-3">
          <h3 className="font-bold text-md mb-2">Admission</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['admission_id', 'admission_time', 'location', 'reason'].map((field, idx) => (
              <input key={idx} placeholder={field.replace('_', ' ').toUpperCase()} type={field === 'admission_time' ? 'datetime-local' : 'text'} className="input input-bordered" value={formData.admission[field]} onChange={e => handleAdmissionChange(field, e.target.value)} />
            ))}
          </div>
        </div>

        {/* Medications */}
        <div className="border-t pt-3">
          <h3 className="font-bold text-md mb-2">Medications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {['name', 'dose', 'frequency', 'start_date', 'end_date'].map((key, idx) => (
              <input key={idx} placeholder={key.replace('_', ' ').toUpperCase()} type={key.includes('date') ? 'date' : 'text'} className="input input-bordered" value={formData.medications[0][key]} onChange={e => handleArrayChange('medications', 0, key, e.target.value)} />
            ))}
          </div>
        </div>

        {/* Vitals */}
        <div className="border-t pt-3">
          <h3 className="font-bold text-md mb-2">Vitals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Type (e.g. BP)" className="input input-bordered" value={formData.vitals[0].type} onChange={e => handleArrayChange('vitals', 0, 'type', e.target.value)} />
            <input placeholder="Value" className="input input-bordered" value={formData.vitals[0].value} onChange={e => handleArrayChange('vitals', 0, 'value', e.target.value)} />
          </div>
        </div>

        {/* Others */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <input placeholder="Symptoms (comma separated)" className="input input-bordered" value={formData.symptoms.join(',')} onChange={e => handleFieldChange('symptoms', e.target.value.split(','))} />
          <input placeholder="Procedures (comma separated)" className="input input-bordered" value={formData.procedures.join(',')} onChange={e => handleFieldChange('procedures', e.target.value.split(','))} />
        </div>

        {/* Notes */}
        <div className="border-t pt-3">
          <h3 className="font-bold text-md mb-2">Notes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Author" className="input input-bordered" value={formData.notes[0].author} onChange={e => handleArrayChange('notes', 0, 'author', e.target.value)} />
            <input type="datetime-local" placeholder="Time" className="input input-bordered" value={formData.notes[0].timestamp} onChange={e => handleArrayChange('notes', 0, 'timestamp', e.target.value)} />
            <textarea placeholder="Content" className="textarea textarea-bordered col-span-2" value={formData.notes[0].content} onChange={e => handleArrayChange('notes', 0, 'content', e.target.value)} />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center mt-4 mb-2">
          <button className="btn btn-neutral btn-outline text-[rgb(0,149,218)] border-[rgb(0,149,218)] font-semibold bg-white border-2 rounded-xl px-6 py-2" onClick={handleSubmit}>
            Submit
          </button>
        </div>

      </div>
    </div>
  );
};

export default InputCard;
