import React from 'react'

function AdminNavbar() {
  return (
    <div className='bg-black/20 px-6 py-3 fixed left-0 w-full z-50 text-white top-0 flex justify-between backdrop-blur-sm'>
      {/* Text on the left */}
      <div className='font-convergence text-[25px] items-center flex'>
        <p className='text-[rgb(0,149,218)]'>
          EHR Platform
        </p>
      </div>

      {/* Logo on the right */}
      <div>
        <img src='/logo.svg' alt='logo' />
      </div>
    </div>
  )
}

export default AdminNavbar
