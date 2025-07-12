import React from 'react'

function Navbar() {
  return (
    <div className='bg-black/20 px-6 py-3 sticky z-50 text-white backdrop-blur-sm top-0 flex justify-between'>
      {/* Text on the left */}
      <div className='font-convergence text-[25px] items-center flex'>
        <p>
          EHR Platform
        </p>
      </div>

      {/* Logo on the right */}
      <div>
        <img src='logo.svg' alt='logo' />
      </div>
    </div>
  )
}

export default Navbar
