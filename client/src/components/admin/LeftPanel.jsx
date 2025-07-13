import React from 'react'

const LeftPanel = () => {
  return (
    <div>
        <div className="w-64 h-screen bg-[rgb(34,193,195)] text-white p-6 fixed top-0 left-0 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Admin Menu</h2>
      <ul className="space-y-3">
        <li className="hover:text-gray-200 cursor-pointer">Dashboard</li>
        <li className="hover:text-gray-200 cursor-pointer">Users</li>
        <li className="hover:text-gray-200 cursor-pointer">Settings</li>
        <li className="hover:text-gray-200 cursor-pointer">Logout</li>
      </ul>
    </div>
    </div>
  )
}

export default LeftPanel
