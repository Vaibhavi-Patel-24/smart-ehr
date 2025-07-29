import React from 'react';

function Footer({pos, isLoggedIn, onLogout }) {

  return (
    <div className={`flex justify-center items-center bg-black/20 text-white py-1 bottom-0 ${pos} left-0 w-full`}>
      
      {/* Center Text */}
      <p className="text-xs text-white/80">
        © 2025 All Rights Reserved | EHR organization
      </p>

      {/* LOG OUT Button (conditionally visible) */}
      {isLoggedIn && (
        <button
          onClick={onLogout}
          className="absolute right-4 text-xs font-medium text-white hover:text-red-400 transition"
        >
          LOG OUT
        </button>
      )}
    </div>
  );

};

export default Footer;