import React from 'react'
const inputGroups = [
  ['Name','Branch name', 'Address'],
  ['Contact','Email', 'Password'],
];


const InputCardMedical = () => {
  return (
    <>
      <div className="bg-[rgb(182,177,177)] w-2/3 h-2/4 lg:w-[720px] lg:h-[200px] rounded-xl opacity-80 flex flex-col justify-center items-center gap-4 overflow-y-scroll pl-3 pr-3 lg:pl-0 lg:pr-0 ">
      {inputGroups.map((group, idx) => (
        <div className="flex flex-col lg:flex-row gap-4" key={idx}>
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

export default InputCardMedical
