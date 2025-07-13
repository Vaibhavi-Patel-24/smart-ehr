import React from 'react'

const inputGroups = [
  ['First Name', 'Middle Name', 'Last Name'],
  ['Date of Birth', 'Blood Group', 'Gender'],
  ['Address', 'Admissions', 'Labs'],
  ['Vitals', 'Symptoms', 'Medication'],
  ['Procedure', 'Contact', 'Emergency Contacts'],
  ['Email', 'Finger_print_hash^', 'retina_scan_hash^'],
];

const InputCard = () => {
  return (
    <>
      <div className="bg-[rgb(182,177,177)] w-[750px] h-[400px] rounded-xl opacity-80 flex flex-col justify-center items-center px-3 gap-4 ">
      {inputGroups.map((group, idx) => (
        <div className="flex flex-row gap-4" key={idx}>
          {group.map((placeholder, index) => (
            <input
              key={index}
              type={placeholder.toLowerCase().includes('date') ? 'date' : 'text'}
              placeholder={placeholder}
              className="bg-transparent border-b-2 border-black text-black font-semibold px-2 py-1 focus:outline-none"
            />
          ))}
        </div>
      ))}

      <button className="btn btn-neutral btn-outline rounded-xl text-[rgb(0,149,218)] border-[rgb(0,149,218)] font-semibold bg-white border-2">
        Submit
      </button>
    </div>
      
    </>
  )
}

export default InputCard
