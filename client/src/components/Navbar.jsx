import React from 'react'

function Navbar() {
  return (
    <div class='bg-black/20 px-6 py-3 sticky z-50 text-white backdrop-blur-sm top-0 flex justify-between'>
        <div>
            <img src='logo.svg' alt='logo'/>
        </div>
        <div class='font-convergence text-[25px] items-center flex'>
            <p>
            EHR Platform
            </p>
        </div>
    </div>
  )
}

export default Navbar